// import React from "react";

// import {
//   AppBar,
//   Box,
//   Button,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Toolbar,
//   Typography,
//   Stack,
// } from "@mui/material";
// // import { Box component='a' hrefeact-router-hash-link";
// // import { Link } from "react-router-dom";
// import { Menu } from "@mui/icons-material";
// // import logo from "../../../src/assets/img/logo_web.png";
// // import { HEADER_HEIGHT, DRAWER_WIDTH, WEBSITE_NAME } from "../../constants";
// import Image from "next/image";
// const HEADER_HEIGHT = 80;
// const DRAWER_WIDTH = 240;
// const WEBSITE_NAME='SheetWA'
// const navButtons = (
//   <Box display="flex" flexDirection="row">
//     <Box
//       sx={{
//         display: { xs: "none", sm: "none", md: "none", lg: "flex" },
//         alignItems: "center",
//       }}
//     >
    
//         <Button
//           size="large"
//           color="primary"
//           sx={{
//             margin: "5px 15px",
//             fontWeight: "700",
//           }}
//         >
//           Home
//         </Button>
     

//       {/* <Button
//         size="large"
//         color="primary"
//         sx={{ margin: "5px 15px", fontWeight: "700" }}
//         component={Link}
//         to="/how-it-works"
//       >
//         How it works
//       </Button> */}

//       <Button
//         size="large"
//         color="primary"
//         sx={{ margin: "5px 15px", fontWeight: "700" }}
//         component='a'
//         href="/tutorials"
//       >
//         Tutorials
//       </Button>
//       {/* <Button
//         size="large"
//         color="primary"
//         sx={{ margin: "5px 15px", fontWeight: "700" }}
//         component='a'
//         to="/blogs"
//       >
//         Blogs
//       </Button> */}
//       {/* <a href="/blogs" target="_blank"> */}
    
//       {/* </a> */}
//       <Button
//         size="large"
//         color="primary"
//         sx={{ margin: "5px 15px", fontWeight: "700" }}
//         component='a'
//         href="/features"
//       >
//         Features
//       </Button>

//       <Button
//         size="large"
//         color="primary"
//         sx={{ margin: "5px 15px", fontWeight: "700" }}
//         component='a'
//         href="/pricing"
//       >
//         Pricing
//       </Button>

//       {/* <Has'a'smooth to="/#contact" style={{ textDecoration: 'none' }}>
//         <Button size="large" color="primary" sx={{ margin: '5px 15px' }}>
//           Contact
//         </Button>
//       </Has'a' */}

//       <Button
//         size="large"
//         color="primary"
//         sx={{ margin: "5px 15px", fontWeight: "700" }}
//         component='a'
//         href="/faq"
//       >
//         FAQs
//       </Button>

//       <Box>
//         <Button
//           color="primary"
//           variant="contained"
//           size="large"
//           sx={{ fontWeight: "600" }}
//           component='a'
//           href="/auth"
//         >
//           Login
//         </Button>
//       </Box>
//     </Box>
//   </Box>
// );

// export default function DrawerAppBar() {
//   const [openDrawer, setOpenDrawer] = React.useState(false);
//   function toggleDrawer() {
//     setOpenDrawer(!openDrawer);
//   }

//   return (
//     <Box>
//       <AppBar
//         sx={{
//           margin: "0px",
//           position: "fixed",
//           height: `${HEADER_HEIGHT}px`,
//           justifyContent: "center",
//         }}
       
//       >
//         <Toolbar>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", sm: "none", md: "block" },
//             }}
//           >
//             <Box component='a' href="/#home" style={{ textDecoration: "none" }}>
//               <Stack
//                 direction="row"
//                 spacing={1}
//                 display={"flex"}
//                 justifyItems={"center"}
//                 alignItems={"center"}
//               >
//                 <Image
//                   src="https://ik.imagekit.io/ww4pq6w6n/videos/sheetwa_logo_rounded_dp_x6R5RbTUE.png?updatedAt=1696096625826"
//                   alt="logo big"
//                   height={60}
//                   width={60}
//                 />
//                 <Typography
//                   variant="h5"
//                   color={"primary"}
//                   align="center"
//                   justifyContent={"center"}
//                 >
//                   {WEBSITE_NAME}
//                 </Typography>
//               </Stack>
//             </Box componenhref  </Box>

//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "block", sm: "block", md: "none" },
//             }}
//           >
//             <Box component='a' href="/#home" style={{ textDecoration: "none" }}>
//               <Stack
//                 direction="row"
//                 spacing={1}
//                 display={"flex"}
//                 justifyItems={"center"}
//                 alignItems={"center"}
//               >
//                 <img src={logo} alt="logo small" height="40px" />
//                 <Typography
//                   variant="h6"
//                   color={"primary"}
//                   align="center"
//                   justifyContent={"center"}
//                 >
//                   {WEBSITE_NAME}
//                 </Typography>
//               </Stack>
//             </Box>
//             </Box>
//           {navButtons}
//           <IconButton
//             color="inherit"
//             onClick={toggleDrawer}
//             sx={{ display: { xs: "block", sm: "block", lg: "none" } }}
//           >
//             <Menu />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box component="nav">
//         <Drawer
//           variant="temporary"
//           anchor="left"
//           open={openDrawer}
//           onClose={toggleDrawer}
//           sx={{
//             display: { xs: "block", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: DRAWER_WIDTH,
//             },
//           }}
//         >
//           <Stack
//             direction="row"
//             spacing={1}
//             display={"flex"}
//             justifyItems={"center"}
//             alignItems={"center"}
//             alignSelf={"center"}
//             minHeight={"60px"}
//           >
//             <img src={logo} alt="logo small" height="40px" />
//             <Typography
//               variant="h6"
//               color={"primary"}
//               align="center"
//               justifyContent={"center"}
//             >
//               {WEBSITE_NAME}
//             </Typography>
//           </Stack>
//           <Divider />
//           <List sx={{ alignSelf: "center" }}>
//             <ListItem disablePadding>
//               <ListItemButton href="/#home" onClick={toggleDrawer}>
//                 <ListItemText primary="Home" sx={{ textAlign: "center" }} />
//               </ListItemButton>
//             </ListItem>

//             {/* <ListItem disablePadding>
//               <ListItemButton href="/#howitworks" onClick={toggleDrawer}>
//                 <ListItemText
//                   primary="How it works"
//                   sx={{ textAlign: "center" }}
//                 />
//               </ListItemButton>
//             </ListItem> */}
//             <ListItem disablePadding>
//               <ListItemButton href="/tutorials" onClick={toggleDrawer}>
//                 <ListItemText
//                   primary="Tutorials"
//                   sx={{ textAlign: "center" }}
//                 />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton href="/features" onClick={toggleDrawer}>
//                 <ListItemText primary="Features" sx={{ textAlign: "center" }} />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton href="/blogs" onClick={toggleDrawer}>
//                 <ListItemText primary="Blogs" sx={{ textAlign: "center" }} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton href="/pricing" onClick={toggleDrawer}>
//                 <ListItemText primary="Pricing" sx={{ textAlign: "center" }} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton href="/#faq" onClick={toggleDrawer}>
//                 <ListItemText primary="FAQs" sx={{ textAlign: "center" }} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 size="large"
//                 sx={{ fontWeight: "600" }}
//                 component={Link}
//                 to="/auth"
//                 onClick={toggleDrawer}
//               >
//                 Login
//               </Button>
//             </ListItem>
//           </List>
//         </Drawer>
//       </Box>
//     </Box>
//   );
// }
