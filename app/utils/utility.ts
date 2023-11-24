type HandleChangeFunction = (
  content: string,
  editor: any, // Adjust the type of 'editor' as per your requirements
  setNoSubOfHeading: React.Dispatch<React.SetStateAction<number>>,
  setNoOfHeading: React.Dispatch<React.SetStateAction<number>>,
  setNoImages: React.Dispatch<React.SetStateAction<number>>,
  setNoOfWords: React.Dispatch<React.SetStateAction<number>>,
  setNoLinks: React.Dispatch<React.SetStateAction<number>>
) => Promise<void>;
export function dateToString(date: any) {
  if (!date || date == "null") {
    return "";
  }
  const option = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const newDate = new Date(date);
  const localDateString = newDate.toLocaleString("en-IN", option);

  // if (localDateString === "Invalid Date") {
  //   return "Attention required";
  // }
  return localDateString;
}

export const handleEditorChange: HandleChangeFunction = async (
  content,
  editor,
  setNoSubOfHeading,
  setNoOfHeading,
  setNoImages,
  setNoOfWords,
  setNoLinks
) => {
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
    (element) => element?.textContent.trim() !== ""
  );
  const links = tempDiv.querySelectorAll("a");

  setNoSubOfHeading(h2Elements.length);
  setNoOfHeading(h1Elements.length);
  setNoImages(editor.current.getFilesInfo("image").length);
  setNoOfWords(words.length);
  setNoLinks(links.length);
};
type HandelSaveFunction = (
  type: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  editor: any, // Replace 'any' with the actual type of your editor object
  session: any, // Replace 'any' with the actual type of your session object
  title: string,
  noOfSubHeading: number,
  noOfHeading: number,
  noOfImage: number,
  noOfWords: number,
  noOfLinks: number,
  metaTitle: any,
  metaDescription: any,
  canonical: any,
  slug: any,
  category: any,
  tags: any
) => void;
e const handelDataToSave: HandelSaveFunction = (
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
  metaTitle,
  metaDescription,
  canonical,
  slug,
  category,
  tags
) => {
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
    blogStatus: type,
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
  return dataToSend;
};
