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
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import SaveIcon from "@mui/icons-material/Save";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import CategoryAddEditor from "@/app/componets/CategoryAddEditorComponent";
import TagsAddEditor from "@/app/componets/TagsAddEditor";
import AdvanceSettingsSection from "@/app/componets/AdvanceSettingsSection";
import { useUserContext } from "@/app/store/editorContext";
import BlogsStatus from "@/app/componets/BlogsStatus";
import BlogsRightStatsBar from "@/app/componets/BlogsRightStatsBar";
import Editor from "@/app/componets/Editor";
import { handleEditorChange } from "@/app/utils/utility";
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
  const handleDraft = async () => {
    try {
      var tableOfContentsId: any = [];
      setIsLoading(true);
      var htmlString = `${editor.current.getContents()}`;

      // Create a temporary DOM element to manipulate the HTML string
      var tempElement = document.createElement("div");
      tempElement.innerHTML = htmlString;

      // Select all <h2> elements within the temporary element
      var h2Elements = tempElement.querySelectorAll("h2");

      // Loop through each <h2> element and set its id based on its content
      h2Elements.forEach(function (h2Element) {
        var content = h2Element.textContent || h2Element.innerText; // Get the content of the <h2> element
        tableOfContentsId.push({
          headingId: content.replace(/\s+/g, "-").toLocaleLowerCase(),
          headingTitle: content,
        });
        h2Element.id = content.replace(/\s+/g, "-").toLocaleLowerCase(); // Set the id based on the trimmed content
      });

      // Get the modified HTML string from the temporary element
      var modifiedHtmlString = tempElement.innerHTML;
      const dataToSend = {
        blogStatus: "Draft",
        html: modifiedHtmlString,
        tableOfContentsId,
        title: title,
        writtenBy: session.user.email,
        blogId: params.id,
        stats: {
          noOfSubHeading,
          noOfHeading,
          noOfImage,
          noOfWords,
          noOfLinks,
          readTime: Math.ceil(noOfWords / 225),
        },
        seo: {
          metaTitle,
          metaDescription,
          canonical,
          slug,
          category,
          tags,
        },
      };
      if (thumbnail) {
        dataToSend.stats.thumbnail = thumbnail;
      }

      const { data } = await axios
        .patch(`/api/blogs`, dataToSend)
        .then(() => router.push("/user/dashboard"));
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePublish = async () => {
    try {
      var tableOfContentsId: any = [];
      setIsLoading(true);
      var htmlString = `${editor.current.getContents()}`;

      // Create a temporary DOM element to manipulate the HTML string
      var tempElement = document.createElement("div");
      tempElement.innerHTML = htmlString;

      // Select all <h2> elements within the temporary element
      var h2Elements = tempElement.querySelectorAll("h2");

      // Loop through each <h2> element and set its id based on its content
      h2Elements.forEach(function (h2Element) {
        var content = h2Element.textContent || h2Element.innerText; // Get the content of the <h2> element
        tableOfContentsId.push({
          headingId: content.replace(/\s+/g, "-").toLocaleLowerCase(),
          headingTitle: content,
        });
        h2Element.id = content.replace(/\s+/g, "-").toLocaleLowerCase(); // Set the id based on the trimmed content
      });

      // Get the modified HTML string from the temporary element
      var modifiedHtmlString = tempElement.innerHTML;
      const dataToSend = {
        blogStatus: "Publish",
        html: modifiedHtmlString,
        tableOfContentsId,
        title: title,
        writtenBy: session.user.email,
        blogId: params.id,
        stats: {
          noOfSubHeading,
          noOfImage,
          noOfWords,
          noOfLinks,
          readTime: Math.ceil(noOfWords / 225),
        },
        seo: {
          metaTitle,
          metaDescription,
          canonical,
          slug,
          category,
          tags,
        },
      };
      if (thumbnail) {
        dataToSend.stats.thumbnail = thumbnail;
      }
      const { data } = await axios
        .patch(`/api/blogs`, dataToSend)
        .then(() => router.push("/user/dashboard"));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
            maxWidth: "700px",
            width: "100%",

            marginTop: "10vh",
            padding: "1rem",
            borderRadius: "16px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard" // <== changed this
            fullWidth
            multiline
            focused={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            InputProps={{
              style: {
                backgroundColor: "transparent",
                fontSize: "2rem",
              },
              disableUnderline: true,
            }}
            InputLabelProps={{
              style: {
                color: "#919EAB",
                fontSize: "2rem",
                fontWeight: "bolder",
              },
            }}
          ></TextField>

          <Editor
            getSunEditorInstance={getSunEditorInstance}
            handleChange={handleChange}
            onImageUploadBefore={onImageUploadBefore}
            defaultValue={editorHtml}
          />
        </Box>
        <BlogsRightStatsBar
          noOfWords={noOfWords}
          handleDraft={handleDraft}
          handlePublish={handlePublish}
          blogStatus={blogStatus}
        />
      </Box>
    </>
  );
}
