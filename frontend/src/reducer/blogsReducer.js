import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  message: "",
  allblogs: "",
  update: "",
};

export const addBlog = createAsyncThunk("AddBlogs", async (body) => {
  console.log(body);
  console.log(localStorage.getItem("id"));

  try {
    const { data } = await axios.post("api/blog/add", {
      title: body.title,
      description: body.description,
      image: body.image,
      user: localStorage.getItem("id").split('"').join(""),
    });

    return data.message;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const allBlog = createAsyncThunk("AllBlogs", async () => {
  console.log();

  try {
    const { data } = await axios.get("/api/blog/all");
    // console.log(user);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
});

const blogs = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateData(state, action) {
      state.update = action.payload;
    },
    updateTitle(state, action) {
      state.update.title = action.payload;
    },
    updateDescription(state, action) {
      state.update.description = action.payload;
    },
    updateImage(state, action) {
      state.update.image = action.payload;
    },
  },
  extraReducers: {
    [addBlog.fulfilled]: (state, action) => {
      state.message = action.payload;
      // if (action.payload) {
      //   navigate("/allblogs");
      // }
      //   console.log(action.payload.response.data.message);
    },
    [allBlog.fulfilled]: (state, action) => {
      state.allblogs = action.payload;

      //   console.log(action.payload.response.data.message);
    },
  },
});

export const { updateData, updateTitle, updateDescription, updateImage } =
  blogs.actions;

export default blogs.reducer;
