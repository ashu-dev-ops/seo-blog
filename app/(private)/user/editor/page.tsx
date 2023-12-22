"use client";
import { Box, CircularProgress } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { useRouter } from "next/navigation";
import axios from "axios";
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
export default function Page() {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [noOfHeading, setNoOfHeading] = useState(0);
  const [noOfSubHeading, setNoSubOfHeading] = useState(0);
  const [noOfWords, setNoOfWords] = useState(0);
  const [noOfWordsInTitle, setNoWordsInTitle] = useState(0);
  const [noOfImage, setNoImages] = useState(0);
  const [noOfLinks, setNoLinks] = useState(0);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnaul] = useState("");
  const {
    metaTitle,
    metaDescription,
    canonical,
    slug,
    category,
    tags,
    handleSlug,
    resetEditorContext,
  } = useUserContext();
  const editor = useRef();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: any): void => {
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
        uploadHandler(res);
      })();

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

    await axios
      .post(`/api/blogs`, dataToSend)
      .then(() => router.push("/user/dashboard"));
  };
  useEffect(() => {
    resetEditorContext();
  }, []);
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
  return (
    <>
      <Box
        sx={{
          paddingBottom: "20vh",
          paddingTop: "5vh",
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
          />
        </Box>
        <BlogsRightStatsBar
          noOfWords={noOfWords}
          handleDraft={() => handleSave("Draft")}
          handlePublish={() => handleSave("Publish")}
        />
      </Box>
    </>
  );
}
