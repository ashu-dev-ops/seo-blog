// Define the state type
interface UserState {
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  slug?: string;
  logIn?: boolean;
  allTags?: any;
  tags?: any;
}

// Define the action types
type UserAction =
  | { type: "SET_META_TAGS"; payload: any }
  | { type: "SET_CONONICAL"; payload: string }
  | { type: "SET_SLUG"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_TAGS"; payload: any }
  | { type: "SET_ALL_TAGS"; payload: any }
  | { type: "RESET_EDITOR_CONTEXT" };
const userReducer = (state: UserState, action: UserAction) => {
  if (action.type === "SET_META_TAGS") {
    return {
      ...state,
      metaTitle: action.payload.metaTitle,
      metaDescription: action.payload.metaDescription,
    };
  }

  if (action.type === "SET_CONONICAL") {
    return { ...state, canonical: action.payload };
  }
  if (action.type === "SET_SLUG") {
    const processedText = action.payload
      .replace(/[^\w\s\-]/gi, "")
      .replace(/\s+/g, " ");
    // Convert to lowercase and replace spaces with hyphens
    const finalText = processedText.toLowerCase().replace(/\s+/g, "-");
    console.log('slug i am setting',finalText)
    return { ...state, slug: finalText };
  }
  if (action.type === "SET_TAGS") {
    // const arrayOfStrings = action.payload.map((obj: any) => obj.name);
    console.log("running set reducers");
    if (Array.isArray(action.payload)) {
      console.log("new value if it is array", [...action.payload]);
      return { ...state, tags: [...action.payload] };
    } else {
      return { ...state, tags: [...state.tags, action.payload] };
    }
    // return { ...state, tags: [...state.tags, action.payload] };
  }
  if (action.type === "SET_CATEGORY") {
    return { ...state, category: action.payload };
  }
  if (action.type === "SET_ALL_TAGS") {
    if (Array.isArray(action.payload)) {
      return { ...state, allTags: [...state.allTags, ...action.payload] };
    } else {
      return { ...state, allTags: [...state.allTags, action.payload] };
    }
  }
  if (action.type === "RESET_EDITOR_CONTEXT") {
    console.log("reducer running of ediitor reset>>>>>>>>");
    return {
      metaTitle: "",
      metaDescription: "",
      canonical: "",
      slug: "",
      tags: [],
      category: [],
      slugT: "",
      allTags: [],
    };
  }
  return { ...state };
};
export default userReducer;
