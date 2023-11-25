"use client";
import { Box, TextField, CircularProgress } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useUserContext } from "@/app/store/editorContext";
import BlogsStatus from "@/app/componets/BlogsStatus";
import BlogsRightStatsBar from "@/app/componets/BlogsRightStatsBar";
import Editor from "@/app/componets/Editor";
import { handleEditorChange } from "@/app/utils/utility";

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
        console.log("number of image >>>>>>>>>>.", noOfImage);
        console.log("we got thumbnail>>>>>>>>>>..,", data?.thumbnail);
        if (noOfImage.length === 0) {
          console.log("runing change thumbnail  image >>>>>>>>>>>>..");
          setThumbnaul(data?.thumbnail);
        }
        console.log(thumbnail);

        uploadHandler(res);
      })();

      uploadHandler();
    };
  }

  const handleDraft = async () => {
    console.log(metaTitle, metaDescription, canonical, slug, tags, category);
    try {
      var tableOfContentsId: any = [];
      // setIsLoading(true);
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
      var firstImage = tempElement.querySelector("img");
      var firstParagraph = tempElement.querySelector(
        "p:not(:empty):not(:has(br))"
      );
      var srcAttribute;
      var paragraphText;
      // Check if an image was found
      if (firstImage) {
        // Extract the src attribute
        srcAttribute = firstImage.getAttribute("src");
      }
      // Check if a non-empty paragraph was found
      if (firstParagraph) {
        // Extract the text content of the paragraph
        console.log(firstParagraph?.textContent);
        paragraphText = firstParagraph?.textContent
          .split(/\s+/)
          .slice(0, 20)
          .join(" ");

        console.log("First Non-Empty Paragraph:", paragraphText);
      }
      // Get the modified HTML string from the temporary element
      var modifiedHtmlString = tempElement.innerHTML;
      const dataToSend = {
        blogStatus: "Draft",
        html: modifiedHtmlString,
        tableOfContentsId,
        title: title,
        writtenBy: session.user.email,

        stats: {
          noOfSubHeading,
          noOfHeading,
          noOfImage,
          noOfWords,
          noOfLinks,
          readTime: Math.ceil(noOfWords / 225),
          thumbnail: srcAttribute
            ? srcAttribute
            : "https://ik.imagekit.io/ww4pq6w6n/videos/sheetwa_logo_rounded_dp_x6R5RbTUE.png?updatedAt=1696096625826&tr=w-1200%2Ch-675%2Cfo-auto",
        },
        seo: {
          metaTitle: metaTitle ? metaTitle : title,
          metaDescription: metaDescription ? metaDescription : paragraphText,
          canonical,
          slug: slug
            ? slug
            : title.toLowerCase().replace(/\s+/g, " ").replace(/\s+/g, "-"),
          category,
          tags,
        },
      };
      console.log("data-that-im-am sending>>>>>>>>>>>>>>>>>>", dataToSend);
      // if (thumbnail) {
      //   dataToSend.stats.thumbnail = thumbnail;
      // }

      await axios
        .post(`/api/blogs`, dataToSend)
        .then(() => router.push("/user/dashboard"));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async () => {
    try {
      var tableOfContentsId: any = [];
      // setIsLoading(true);
      console.log("LOADING TRUE HTML STARTED EXTRACTION");
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
      var firstImage = tempElement.querySelector("img");
      var firstParagraph = tempElement.querySelector(
        "p:not(:empty):not(:has(br))"
      );
      var srcAttribute;
      var paragraphText;
      var defaultSlug;
      // Check if an image was found
      if (firstImage) {
        // Extract the src attribute
        srcAttribute = firstImage.getAttribute("src");
      }
      // Check if a non-empty paragraph was found
      if (firstParagraph) {
        // Extract the text content of the paragraph
        paragraphText = firstParagraph?.textContent
          .split(/\s+/)
          .slice(0, 20)
          .join(" ");
        console.log("First Non-Empty Paragraph:", paragraphText);
      }
      // Get the modified HTML string from the temporary element
      console.log("LOADING TRUE HTML NEAR END");
      var modifiedHtmlString = tempElement.innerHTML;
      console.log("LOADING TRUE HTML  END AND DATA TO SEND IN ");
      const dataToSend = {
        blogStatus: "Publish",
        html: modifiedHtmlString,
        tableOfContentsId,
        title: title,
        writtenBy: session.user.email,

        stats: {
          noOfSubHeading,
          noOfHeading,
          noOfImage,
          noOfWords,
          noOfLinks,
          readTime: Math.ceil(noOfWords / 225),
          thumbnail: srcAttribute
            ? srcAttribute
            : "https://ik.imagekit.io/ww4pq6w6n/videos/sheetwa_logo_rounded_dp_x6R5RbTUE.png?updatedAt=1696096625826&tr=w-1200%2Ch-675%2Cfo-auto",
        },
        seo: {
          metaTitle: metaTitle ? metaTitle : title,
          metaDescription: metaDescription ? metaDescription : paragraphText,
          canonical,
          slug: slug
            ? slug
            : title.toLowerCase().replace(/\s+/g, " ").replace(/\s+/g, "-"),
          category,
          tags,
        },
      };
      if (thumbnail) {
        dataToSend.stats.thumbnail = thumbnail;
      }
      console.log("data we are sending for publish", dataToSend);
      await axios
        .post(`/api/blogs`, dataToSend)
        .then(() => router.push("/user/dashboard"));
    } catch (error) {
      console.log(error);
    }
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
          // marginTop: "5vh",
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
            onChange={(e) => {
              setTitle(e.target.value);
              const stringWithoutSpaces = e.target.value;

              const wordsArray = stringWithoutSpaces.trim().split(/\s+/);
              handleSlug(e.target.value);
              console.log("array ", wordsArray.length);
              setNoWordsInTitle(wordsArray.length);
            }}
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
          />
        </Box>
        <BlogsRightStatsBar
          noOfWords={noOfWords}
          handleDraft={handleDraft}
          handlePublish={handlePublish}
        />
      </Box>
    </>
  );
}
