import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  tags: [],
  category: [],
  posts: [],
};
export const getAllTags = createAsyncThunk(
  "user/getAllTags",
  async (thunkAPI) => {
    try {
      console.log("running");

      const resp = await axios.get("http://localhost:3000/api/blogs/tags");

      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const addTag = createAsyncThunk(
  "user/addTag",
  async (payload, thunkAPI) => {
    try {
      console.log("running");

      const resp = await axios.post(
        "http://localhost:3000/api/blogs/tags",
        payload
      );

      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const updateTag = createAsyncThunk(
  "user/updateTag",
  async (payload, thunkAPI) => {
    try {
      console.log("running");
      const resp = await axios.patch(
        "http://localhost:3000/api/blogs/tags",
        payload
      );
      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const getAllCategory = createAsyncThunk(
  "user/getAllTags",
  async (payload, thunkAPI) => {
    try {
      console.log("running");

      const resp = await axios.get(
        "http://localhost:3000/api/blogs/category",
        payload
      );

      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const addCategory = createAsyncThunk(
  "user/addCategory",
  async (payload, thunkAPI) => {
    try {
      console.log("running");
      const resp = await axios.get(
        "http://localhost:3000/api/blogs/category",
        payload
      );
      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "user/updateCategory",
  async (payload, thunkAPI) => {
    try {
      console.log("running");
      const resp = await axios.get("private-auth/signin", payload);
      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const saveMetaInfo = createAsyncThunk(
  "user/metaInfo",
  async (payload, thunkAPI) => {
    try {
      console.log("running");
      const resp = await axios.get("private-auth/signin", payload);
      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const saveCononical = createAsyncThunk(
  "user/cononical",
  async (payload, thunkAPI) => {
    try {
      console.log("running");
      const resp = await axios.get("private-auth/signin", payload);
      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const saveSlug = createAsyncThunk(
  "user/slug",
  async (payload, thunkAPI) => {
    try {
      console.log("running");
      const resp = await axios.get("private-auth/signin", payload);
      console.log(resp.data);
      return resp.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTags.fulfilled, (state, { payload }) => {
      const { tags } = payload;
      state.tags = tags;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
