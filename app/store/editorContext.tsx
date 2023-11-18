"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./editorReducer";
// Define the state type
interface UserState {
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  slug?: string;
  logIn?: boolean;
  tags?: [];
  category?: [];
}

const initialState = {
  metaTitle: "",
  metaDescription: "",
  canonical: "",
  slug: "",
  tags: [],
  category: [],
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
    dispatch({
      type: "SET_SLUG",
      payload: value,
    });
  };
  const handleTags = (value: any) => {
    console.log(value);
    dispatch({
      type: "SET_TAGS",
      payload: value,
    });
  };
  const handleCategory = (value: any) => {
    console.log(value);
    dispatch({
      type: "SET_CATEGORY",
      payload: value,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleCononical,
        handleSlug,
        handleMetaTags,
        handleTags,
        handleCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
