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
  tags: any,
  noOfWordsInTitle: number
) => void;
export const handelDataToSaveEditor: HandelSaveFunction = (
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
  var firstImage = tempElement.querySelector("img");
  var firstParagraph = tempElement.querySelector("p:not(:empty):not(:has(br))");
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
      noOfWordsInTitle,
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
  return dataToSend;
};
