"use client";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import CategoryAddEditor from "@/app/componets/CategoryAddEditorComponent";
import TagsAddEditor from "@/app/componets/TagsAddEditor";
import TagsCurdModel from "@/app/componets/TagsCurdModel";
import AdvanceSettingsSection from "@/app/componets/AdvanceSettingsSection";
import { useUserContext } from "@/app/store/editorContext";
// import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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
  const { metaTitle, metaDescription, canonical, slug, category, tags } =
    useUserContext();
  const editor = useRef();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: any): void => {
    editor.current = sunEditor;
  };
  function handleChange(content: String) {
    console.log("print content >>>>>>>>>>>.", editor.current.getContents());
    // console.log(content); //Get Content Inside Editor
    // console.log(editor.current.getText());

    const words = editor.current.getText().split(" ");
    console.log(`Content words should be > 800. Current: 2 ${words.length}`);

    // Create a temporary div element to parse the HTML string
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Use querySelectorAll to select all <h2> elements
    const h2Elements = tempDiv.querySelectorAll("h3");
    const h1Elements = Array.from(tempDiv.querySelectorAll("h2")).filter(
      (element) => element.textContent.trim() !== ""
    );
    const links = tempDiv.querySelectorAll("a");

    setNoSubOfHeading(h2Elements.length);
    setNoOfHeading(h1Elements.length);
    setNoImages(editor.current.getFilesInfo("image").length);
    setNoOfWords(words.length);
    setNoLinks(links.length);
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
      console.log("data-that-im-am sending>>>>>>>>>>>>>>>>>>", dataToSend);
      if (thumbnail) {
        dataToSend.stats.thumbnail = thumbnail;
      }

      const { data } = await axios
        .post(`/api/blogs`, dataToSend)
        .then(() => router.push("/user/dashboard"));
      console.log(data);
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
        .post(`/api/blogs`, dataToSend)
        .then(() => router.push("/user/dashboard"));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const check = (num: any) => {
    console.log("from num", num);
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
          // marginTop: "5vh",
          paddingBottom: "20vh",
          paddingTop: "5vh",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#E2E8F0",
        }}
      >
        <Box
          sx={{
            // postion: "fixed !important",
            position: "fixed",
            maxWidth: "250px",
            width: "20%",
            top: "120px",
            left: "15px",
            // color: "white",
            borderRadius: "16px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            gap: 1,
          }}
        >
          <Typography fontWeight="bolder">SEO Best Practises</Typography>
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfWordsInTitle <= 12 && noOfWordsInTitle >= 8 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Title words should be 7 - 12. <br></br> Current:{" "}
                {`${noOfWordsInTitle ? noOfWordsInTitle : 0}`}
              </Typography>
            </Box>
          </Stack>
          {/*  */}
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfWords >= 500 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText" lineHeight="19px">
                Content words should be &gt; 500. <br></br> Current:
                {`${noOfWords ? noOfWords : 0}`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfImage >= 2 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Images should be at least 1 <br></br> Current:{" "}
                {`${noOfImage ? noOfImage : 0}`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfHeading >= 2 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Headings(h2) should be at least 2.
                <br></br> Current: {`${noOfHeading ? noOfHeading : 0}`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfSubHeading >= 1 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Subheadings(h3) should be at least 1. <br></br> Current:{" "}
                {`${noOfSubHeading ? noOfSubHeading : 0}`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfLinks >= 2 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Internal links should be atleast 1.<br></br> Current:{" "}
                {`${noOfLinks ? noOfLinks : 0}`}
              </Typography>
            </Box>
          </Stack>
        </Box>
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
          <SunEditor
            getSunEditorInstance={getSunEditorInstance}
            onChange={handleChange}
            onImageUploadBefore={onImageUploadBefore()}
            minHeight="400px"
            height="100% "
            mediaAutoSelect={false}
            autoFocus={true}
            // defaultValue={`<h1 class=\"ql-align-center\">Revolutionize Your Insurance Business with Bulk WhatsApp Sender</h1><p class=\"ql-align-center\"><br></p><img alt=\"hero image\" src=\"https://sheetstowhatsapp.com/static/media/hero.2b5dca4daa40da74159e.png\"><p class=\"ql-align-center\"><br></p><p><span class=\"ql-font-poppins\">In the fast-paced world of insurance, connecting with clients is key. At Sheets-to-WhatsApp, we understand the challenges small insurance agents face. Our tool, designed exclusively for insurance professionals, is a game-changer in the industry. Imagine seamlessly transferring data from Excel or Google Sheets into a user-friendly platform that allows you to send personalized messages in bulk. This revolutionary approach not only streamlines communication but also adds a personal touch to each interaction, fostering stronger connections with clients.</span></p><p><br></p><h2><strong>Bulk WhatsApp Sender's Power Unleashed</strong></h2><p><br></p><p>Picture this: Insurance agents effortlessly sending pictures, bulk messages, and even protecting their messages from being marked as spam. Our tool at Sheets-to-WhatsApp empowers agents to stay ahead of the technological curve. The ability to send personalized messages in bulk ensures that clients feel valued, fostering a lasting relationship. As an insurance agent, imagine the time saved not having to call or manually message each client, especially when it's time to remind them about monthly premium payments.</p><p><br></p><h2><strong>The Unique Selling Point of Sheets-to-WhatsApp</strong></h2><p>At the heart of our product is the commitment to improving productivity and efficiency in the workplace of insurance agents. Sheets-to-WhatsApp isn't just a tool; it's a solution tailored to meet the unique needs of small insurance businesses. By streamlining communication processes, agents can focus on what truly matters – building meaningful connections with their clients. The bulk message sending ability is a unique selling point that ensures agents are not only keeping up with but leading the latest technological trends in the industry.</p><p><br></p><h2><strong>Life of a Busy Insurance Agent</strong></h2><p>Consider the life of a busy insurance agent – juggling client meetings, policy updates, and administrative tasks. In this fast-paced environment, every second counts. Here's where Sheets-to-WhatsApp steps in, making the agent's life easier. Picture effortlessly importing data, sending personalized messages, and even sharing essential information through pictures – all at the click of a button. It's not just a tool; it's a partner in the success of your business.</p><p><br></p><h2><strong>Transform Your Business with Sheets-to-WhatsApp</strong></h2><p>In conclusion, Sheets-to-WhatsApp is more than a tool; it's the catalyst for transforming your insurance business. Elevate your customer communication strategies, streamline your processes, and build lasting relationships with your audience. The power of bulk messaging, personalized communication, and cutting-edge technology is at your fingertips. Embrace efficiency, embrace success. Try Sheets-to-WhatsApp today and witness the revolution in your insurance business.</p><p><br></p><h2><em>What challenges do you face as an insurance agent in staying connected with your clients? Share your thoughts and experiences in the comments below!</em></h2>`}
            setOptions={{
              formats: [
                {
                  tag: "h2", // Tag name
                  name: "Heading(h2)", // default: tag name
                  command: "replace", // default: "replace"
                  class: "", // Class names must always begin with "se__format(replace, range, free)_"
                },
                {
                  tag: "h3", // Tag name
                  name: "Sub heading(h3)", // default: tag name
                  command: "replace", // default: "replace"
                  class: "", // Class names must always begin with "se__format(replace, range, free)_"
                },
                {
                  tag: "p", // Tag name
                  name: "Paragraph(p)", // default: tag name
                  command: "replace", // default: "replace"
                  class: "", // Class names must always begin with "se__format(replace, range, free)_"
                },

                "blockquote",
                "pre",
              ],

              buttonList: [
                // ["font", "fontSize", "formatBlock"],
                ["formatBlock", "bold", "underline", "list"],
                ["link", "image", "video" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                // ["paragraphStyle", "blockquote"],
                ["align", "codeView"],
                ["undo", "redo", "removeFormat"],
              ],
              mediaAutoSelect: false,
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "3px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            top: "110px",
            gap: 1,
            // minWidth:""
            width: "20%",
          }}
        >
          <Stack direction="row" gap={1}>
            <Button
              variant="outlined"
              fullWidth={true}
              startIcon={<SaveIcon />}
              onClick={() => {
                handleDraft();
              }}
            >
              {" "}
              Save
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={handlePublish}
              startIcon={<PublishedWithChangesIcon />}
            >
              Publish
            </Button>
          </Stack>
          <Box
            sx={{
              borderRadius: "10px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              gap: 1,
            }}
          >
            <Stack
              justifyContent="space-between"
              direction="row"
              alignItems="center"
            >
              <Typography variant="body2">Status:</Typography>
              <Box
                padding="0.5rem"
                sx={{
                  backgroundColor: "#BEE3F8",
                  borderRadius: "10px",
                  color: "GrayText",
                }}
              >
                Draft
              </Box>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body2">Read time:</Typography>
              <Typography variant="body2" color="GrayText">
                {Math.ceil(noOfWords / 225)}min
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              borderRadius: "10px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              gap: 1,
            }}
          >
            <Typography>Category</Typography>
            <CategoryAddEditor />
            <Typography>Tags</Typography>
            <TagsAddEditor />
          </Box>
          <AdvanceSettingsSection />
        </Box>
      </Box>
    </>
  );
}
