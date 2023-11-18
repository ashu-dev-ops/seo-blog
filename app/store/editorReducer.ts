// Define the state type
interface UserState {
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  slug?: string;
  logIn?: boolean;
}

// Define the action types
type UserAction =
  | { type: "SET_META_TAGS"; payload: any }
  | { type: "SET_CONONICAL"; payload: string }
  | { type: "SET_SLUG"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_TAGS"; payload:any };
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
    return { ...state, slug: action.payload };
  }
  if (action.type === "SET_TAGS") {
    return { ...state, tags: action.payload };
  }
  if (action.type === "SET_CATEGORY") {
    return { ...state, category: action.payload };
  }
  return { ...state };
};
export default userReducer;
