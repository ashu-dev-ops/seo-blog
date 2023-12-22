"use client";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import axios from "axios";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { useUserContext } from "@/app/store/editorContext";
import BlogsStatus from "@/app/componets/BlogsStatus";
import BlogsRightStatsBar from "@/app/componets/BlogsRightStatsBar";
import Editor from "@/app/componets/Editor";
import {
  handelDataToSaveEditor,
  handleEditorChange,
} from "@/app/utils/utility";
import EditorTitleInputField from "@/app/componets/EditorTitleInputField";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
export default function Page({ params }: any) {
  const {
    handleCononical,
    handleSlug,
    handleMetaTags,
    handleTags,
    handleCategory,
    metaTitle,
    metaDescription,
    canonical,
    slug,
    category,
    tags,
  } = useUserContext();
  console.log(params);

  const { data: session }: any = useSession();

  const router = useRouter();
  const [noOfHeading, setNoOfHeading] = useState(0);
  const [noOfSubHeading, setNoSubOfHeading] = useState(0);
  const [noOfWords, setNoOfWords] = useState(0);
  const [noOfWordsInTitle, setNoWordsInTitle] = useState(0);
  const [noOfImage, setNoImages] = useState(0);
  const [noOfLinks, setNoLinks] = useState(0);
  const [title, setTitle] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blogStatus, setBlogStatus] = useState("");
  const [thumbnail, setThumbnaul] = useState("");

  const editor = useRef();
  const fetchData = async () => {
    // console.log();
    console.log("running>>>>>>>>>>>>>.", params.id);
    const data = await axios.get(
      // `http://localhost:3000/api/blogs/65463dbb3ec15979c76ae7ea`
      `/api/blogs/${params.id}`
    );
    console.log(data);
    setEditorHtml(data.data.data.html);
    setTitle(data.data.data.title ? data.data.data.title : "");
    setNoImages(
      data.data.data.stats.noOfImage ? data.data.data.stats.noOfImage : 0
    );
    setNoOfWords(
      data.data.data.stats.noOfWords ? data.data.data.stats.noOfWords : 0
    );
    setNoWordsInTitle(
      data.data.data.stats.noOfWordsInTitle
        ? data.data.data.stats.noOfWordsInTitle
        : 0
    );
    handleSlug(data.data.data?.seo?.slug || "");
    handleCononical(data.data.data?.seo?.canonical || "");
    handleCategory(data.data.data?.seo?.category || []);
    handleTags(data.data.data?.seo?.tags || []);
    handleMetaTags({
      metaDescription: data.data.data?.seo?.metaDescription || "",
      metaTitle: data.data.data?.seo?.metaTitle || "",
    });
    setNoSubOfHeading(
      data.data.data.stats.noOfSubHeading
        ? data.data.data.stats.noOfSubHeading
        : ""
    );
    setNoOfHeading(
      data.data.data.stats.noOfHeading ? data.data.data.stats.noOfHeading : ""
    );
    setBlogStatus(data.data.data.blogStatus);
    setNoLinks(data.data.data.stats.noOfLinks);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  function handleChange(content: any) {
    handleEditorChange(
      content,
      editor,
      setNoSubOfHeading,
      setNoOfHeading,
      setNoImages,
      setNoOfWords,
      setNoLinks
    );
  }
  function onImageUploadBefore() {
    return (files, _info, uploadHandler) => {
      (async () => {
        const formData = new FormData();
        formData.append("file", files[0]);

        const { data } = await axios.post(`/api/file-upload`, formData);

        const res = {
          result: [
            {
              url: data?.url,
              name: "thumbnail",
            },
          ],
        };

        if (noOfImage === 1) {
          setThumbnaul(data.thumbnail);
        }

        uploadHandler(res);
      })();

      // called here for stop double image
      uploadHandler();
    };
  }

  const handleSave = async (type: string) => {
    const dataToSend = handelDataToSaveEditor(
      type,
      setIsLoading,
      editor,
      session,
      title,
      noOfSubHeading,
      noOfHeading,
      noOfImage,
      noOfWords,
      noOfLinks,
      noOfWordsInTitle,
      metaTitle,
      metaDescription,
      canonical,
      slug,
      category,
      tags
    );
    console.log("ready data to send", dataToSend);
    dataToSend.blogId = params.id;
    await axios
      .patch(`/api/blogs`, dataToSend)
      .then(() => router.push("/user/dashboard"));
  };
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "rgb(226,232,240)",
        }}
      >
        <CircularProgress size="5rem" />
      </Box>
    );
  }
  console.log("words in title >>>>>>>>>>>>.", noOfWordsInTitle);
  return (
    <>
      <Box
        sx={{
          marginTop: "0vh",
          padding: "5vh",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#E2E8F0",
        }}
      >
        <BlogsStatus
          noOfWordsInTitle={noOfWordsInTitle}
          noOfWords={noOfWords}
          noOfImage={noOfImage}
          noOfHeading={noOfHeading}
          noOfLinks={noOfLinks}
          noOfSubHeading={noOfSubHeading}
        />
        <Box
          sx={{
            maxWidth: "800px",
            width: "50%",

            marginTop: "10vh",
            padding: "1rem",
            borderRadius: "16px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EditorTitleInputField
            title={title}
            handleSlug={handleSlug}
            setNoWordsInTitle={setNoWordsInTitle}
            setTitle={setTitle}
          />
          <Editor
            getSunEditorInstance={getSunEditorInstance}
            handleChange={handleChange}
            onImageUploadBefore={onImageUploadBefore}
            defaultValue={editorHtml}
          />
        </Box>
        <BlogsRightStatsBar
          noOfWords={noOfWords}
          handleDraft={() => handleSave("Draft")}
          handlePublish={() => handleSave("Publish")}
          blogStatus={blogStatus}
        />
      </Box>
    </>
  );
}
