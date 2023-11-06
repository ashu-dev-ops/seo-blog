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
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function Page({ params }: any) {
  console.log(params);
  //   console.log(usePathname, useSearchParams);
  const { data: session }: any = useSession();
  //   const { blogId } = useRouter();
  //   const router = useRouter();
  const router = useRouter();
  const [noOfHeading, setNoOfHeading] = useState("");
  const [noOfSubHeading, setNoSubOfHeading] = useState("");
  const [noOfWords, setNoOfWords] = useState("");
  const [noOfWordsInTitle, setNoWordsInTitle] = useState("");
  const [noOfImage, setNoImages] = useState("");
  const [noOfLinks, setNoLinks] = useState("");
  const [title, setTitle] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blogStatus, setBlogStatus] = useState("");
  const editor = useRef();
  const fetchData = async () => {
    // console.log();
    console.log("running>>>>>>>>>>>>>.", params.id);
    const data = await axios.get(
      // `http://localhost:3000/api/blogs/65463dbb3ec15979c76ae7ea`
      `${process.env.BASE_URL}/api/blogs/${params.id}`
    );
    console.log(data);
    setEditorHtml(data.data.data.html);
    setTitle(data.data.data.title ? data.data.data.title : "");
    setNoImages(
      data.data.data.stats.noOfImage ? data.data.data.stats.noOfImage : ""
    );
    setNoOfWords(
      data.data.data.stats.noOfWords ? data.data.data.stats.noOfWords : ""
    );
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
  function handleChange(content) {
    console.log("print content >>>>>>>>>>>.", editor.current.getContents());
    // console.log(content); //Get Content Inside Editor
    // console.log(editor.current.getText());

    const words = editor.current.getText().split(" ");
    console.log(`Content words should be > 800. Current: 2 ${words.length}`);

    // Create a temporary div element to parse the HTML string
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Use querySelectorAll to select all <h2> elements
    const h2Elements = tempDiv.querySelectorAll("h2");
    const h1Elements = tempDiv.querySelectorAll("h1");
    const links = tempDiv.querySelectorAll("a");

    setNoSubOfHeading(h2Elements.length);
    setNoOfHeading(h1Elements.length);
    setNoImages(editor.current.getFilesInfo("image").length);
    setNoOfWords(words.length);
    setNoLinks(links.length);
  }
  // async function onImageUploadBefore(
  //   files: any,
  //   info: any,
  //   uploadHandler: any
  // ) {
  //   console.log("running>>>>>>>>>.");
  //   console.log(files, info, typeof uploadHandler);
  //   const formData = new FormData();
  //   formData.append("file", files[0]);
  //   const { data } = await axios.post(
  //     "http://localhost:3000/api/file-upload",
  //     formData
  //   );

  //   const res = {
  //     result: [
  //       {
  //         url: data?.url,
  //         name: "thumbnail",
  //         size: data.size,
  //       },
  //     ],
  //   };
  //   uploadHandler(res);
  // }
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

      // called here for stop double image
      uploadHandler();
    };
  }
  const handleDraft = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios
        .patch(`/api/blogs`, {
          blogStatus: "Draft",
          html: `${editor.current.getContents()}`,
          title: title,
          writtenBy: session.user.email,
          blogId: params.id,
          stats: {
            noOfSubHeading,
            noOfHeading,
            noOfImage,
            noOfWords,
            noOfLinks,
          },
        })
        .then(() => router.push("/user/all-blogs"));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePublish = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios
        .patch(`/api/blogs`, {
          blogStatus: "Publish",
          html: `${editor.current.getContents()}`,
          title: title,
          writtenBy: session.user.email,
          blogId: params.id,
          stats: {
            noOfSubHeading,
            noOfImage,
            noOfWords,
            noOfLinks,
          },
        })
        .then(() => router.push("/user/all-blogs"));
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
        <Box
          sx={{
            // postion: "fixed !important",
            position: " fixed",
            maxWidth: "250px",
            width: "16%",
            top: "120px",
            left: "5px",
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
              {noOfWords >= 800 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Title words should be 8 - 12. <br></br> Current:{" "}
                {`${noOfWordsInTitle}`}
              </Typography>
            </Box>
          </Stack>
          {/*  */}
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfWords >= 800 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Content words should be &gt; 800. <br></br> Current:
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
                Images should be at least 2. <br></br> Current:{" "}
                {`${noOfImage ? noOfImage : 0}`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap={1}>
            <Box>
              {" "}
              {noOfSubHeading >= 2 ? (
                <DoneIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="GrayText">
                Headings should be at least 2.
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
                Subheadings should be at least 1. <br></br> Current:{" "}
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
            marginTop: "25vh",
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
          <SunEditor
            getSunEditorInstance={getSunEditorInstance}
            onChange={handleChange}
            onImageUploadBefore={onImageUploadBefore()}
            minHeight="400px"
            height="100%"
            defaultValue={editorHtml}
            setOptions={{
              formats: ["h1", "h2", "p", "blockquote"],
              // mediaAutoSelect: false,
              buttonList: [
                // ["font", "fontSize", "formatBlock"],
                ["formatBlock", "bold", "underline", "list"],
                ["link", "image", "video" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                // ["paragraphStyle", "blockquote"],
                ["align", "codeView"],
                ["undo", "redo", "removeFormat"],
              ],
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
            top: "190px",
            gap: 1,
            // minWidth:""
            width: "18%",
          }}
        >
          <Stack direction="row" gap={1}>
            <Button variant="outlined" fullWidth={true} onClick={handleDraft}>
              {" "}
              Draft
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={handlePublish}
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
              {blogStatus === "Draft" ? (
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
              ) : (
                <Box
                  padding="0.5rem"
                  sx={{
                    backgroundColor: "rgb(198,246,213)",
                    borderRadius: "10px",
                    color: "GrayText",
                  }}
                >
                  Publish
                </Box>
              )}
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body2">Read time:</Typography>
              <Typography variant="body2" color="GrayText">
                {`${Math.ceil(noOfWords / 200)} minute(s)`}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
