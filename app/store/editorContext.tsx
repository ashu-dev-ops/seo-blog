"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./editorReducer";
import axios from "axios";
// Define the state type
interface UserState {
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  slug?: string;
  logIn?: boolean;
  tags?: any[];
  category?: any[];
  allTags?: readonly any[];
  handleCononical: (value: string) => void;
  handleSlug: (value: string) => void;
  handleTags: (value: any) => void;
  handleCategory: (value: string) => void;
  handleMetaTags: (value: {
    metaTitle: string;
    metaDescription: string;
  }) => void;
}

const initialState = {
  metaTitle: "",
  metaDescription: "",
  canonical: "",
  slug: "",
  tags: [],
  category: [],
  slugT: "",
  allTags: [],
};
const UserContext = createContext<UserState>(initialState);
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleMetaTags = (value: any) => {
    console.log("value>>>>>>>>>>>>>> from context", value);
    dispatch({
      type: "SET_META_TAGS",
      payload: value,
    });
  };
  const handleCononical = (value: string) => {
    dispatch({
      type: "SET_CONONICAL",
      payload: value,
    });
  };
  const handleSlug = (value: string) => {
    console.log(value);
    dispatch({
      type: "SET_SLUG",
      payload: value,
    });
  };
  const handleTags = (value: any) => {
    console.log("adding this as tags", value);
    dispatch({
      type: "SET_TAGS",
      payload: value,
    });
  };
  const handleCategory = (value: any) => {
    console.log("adding this as category", value);
    dispatch({
      type: "SET_CATEGORY",
      payload: value,
    });
  };
  const resetEditorContext = () => {
    console.log("running reset editor context");
    dispatch({ type: "RESET_EDITOR_CONTEXT" });
  };
  const fetchBlog = async () => {
    const data = await axios.get("");
  };
  const setAllTags = (value: any) => {
    dispatch({ type: "SET_ALL_TAGS", payload: value });
  };
  const getAllTags = async () => {
    const data = await axios.get(`/api/blogs/tags`);
    console.log("remove on dev checking>>>>>>>>>>>>>>", data.data.data);
    dispatch({ type: "SET_ALL_TAGS", payload: data.data.data });
  };
  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <UserContext.Provider
      value={{
        ...state,
        handleCononical,
        handleSlug,
        handleMetaTags,
        handleTags,
        handleCategory,
        resetEditorContext,
        setAllTags
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
