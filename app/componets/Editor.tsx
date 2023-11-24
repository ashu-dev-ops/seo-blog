import React from "react";
import SunEditor from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
interface EditorProps {
  getSunEditorInstance: any; // Define the function signature for getSunEditorInstance
  handleChange: (content: string) => void; // Define the function signature for handleChange
  onImageUploadBefore: any; // Define the function signature for onImageUploadBefore
  defaultValue?: string; // defaultValue is an optional prop of type string
}


export default function Editor({
  getSunEditorInstance,
  handleChange,
  onImageUploadBefore,
  defaultValue,
}: EditorProps) {
  return (
    <SunEditor
      getSunEditorInstance={getSunEditorInstance}
      onChange={handleChange}
      onImageUploadBefore={onImageUploadBefore()}
      minHeight="400px"
      height="100% "
      mediaAutoSelect={false}
      autoFocus={true}
      defaultValue={defaultValue ? defaultValue : ""}
      // defaultValue={`<h1 class=\"ql-align-center\">Revolutionize Your Insurance Business with Bulk WhatsApp Sender</h1><p class=\"ql-align-center\"><br></p><img alt=\"hero image\" src=\"https://sheetstowhatsapp.com/static/media/hero.2b5dca4daa40da74159e.png\"><p class=\"ql-align-center\"><br></p><p><span class=\"ql-font-poppins\">In the fast-paced world of insurance, connecting with clients is key. At Sheets-to-WhatsApp, we understand the challenges small insurance agents face. Our tool, designed exclusively for insurance professionals, is a game-changer in the industry. Imagine seamlessly transferring data from Excel or Google Sheets into a user-friendly platform that allows you to send personalized messages in bulk. This revolutionary approach not only streamlines communication but also adds a personal touch to each interaction, fostering stronger connections with clients.</span></p><p><br></p><h2><strong>Bulk WhatsApp Sender's Power Unleashed</strong></h2><p><br></p><p>Picture this: Insurance agents effortlessly sending pictures, bulk messages, and even protecting their messages from being marked as spam. Our tool at Sheets-to-WhatsApp empowers agents to stay ahead of the technological curve. The ability to send personalized messages in bulk ensures that clients feel valued, fostering a lasting relationship. As an insurance agent, imagine the time saved not having to call or manually message each client, especially when it's time to remind them about monthly premium payments.</p><p><br></p><h2><strong>The Unique Selling Point of Sheets-to-WhatsApp</strong></h2><p>At the heart of our product is the commitment to improving productivity and efficiency in the workplace of insurance agents. Sheets-to-WhatsApp isn't just a tool; it's a solution tailored to meet the unique needs of small insurance businesses. By streamlining communication processes, agents can focus on what truly matters – building meaningful connections with their clients. The bulk message sending ability is a unique selling point that ensures agents are not only keeping up with but leading the latest technological trends in the industry.</p><p><br></p><h2><strong>Life of a Busy Insurance Agent</strong></h2><p>Consider the life of a busy insurance agent – juggling client meetings, policy updates, and administrative tasks. In this fast-paced environment, every second counts. Here's where Sheets-to-WhatsApp steps in, making the agent's life easier. Picture effortlessly importing data, sending personalized messages, and even sharing essential information through pictures – all at the click of a button. It's not just a tool; it's a partner in the success of your business.</p><p><br></p><h2><strong>Transform Your Business with Sheets-to-WhatsApp</strong></h2><p>In conclusion, Sheets-to-WhatsApp is more than a tool; it's the catalyst for transforming your insurance business. Elevate your customer communication strategies, streamline your processes, and build lasting relationships with your audience. The power of bulk messaging, personalized communication, and cutting-edge technology is at your fingertips. Embrace efficiency, embrace success. Try Sheets-to-WhatsApp today and witness the revolution in your insurance business.</p><p><br></p><h2><em>What challenges do you face as an insurance agent in staying connected with your clients? Share your thoughts and experiences in the comments below!</em></h2>`}
      setOptions={{
        formats: [
          {
            tag: "h2", // Tag name
            name: `Heading (h2)`, // default: tag name
            command: "replace", // default: "replace"
            class: "", // Class names must always begin with "se__format(replace, range, free)_"
          },
          {
            tag: "h3", // Tag name
            name: `Sub Heading (h3)`, // default: tag name
            command: "replace", // default: "replace"
            class: "", // Class names must always begin with "se__format(replace, range, free)_"
          },
          {
            tag: "p", // Tag name
            name: `Paragraph (p)`, // default: tag name
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
  );
}
