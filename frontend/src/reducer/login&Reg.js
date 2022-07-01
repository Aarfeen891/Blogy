import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  logindata: "",
  token: "",
  signupdata: "",
  loginError: "",
  signupError: "",
  message: "",
};

export const loginUser = createAsyncThunk("loginUser", async (body) => {
  console.log(body);

  try {
    const user = await axios.post("/login", {
      email: body.email,
      password: body.password,
    });
    console.log("hellow");
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const signupUser = createAsyncThunk("signupUser", async (body) => {
  try {
    console.log(body);
    const user = await axios.post("/signup", {
      name: body.name,
      email: body.email,
      password: body.password,
      conPassword: body.cpassword,
    });
    // console.log(data);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
});

// export const addBlog = createAsyncThunk("addBlog", async (body) => {
//   console.log(body);

//   try {
//     const user = await axios.post("/api/blog/add", {
//       title: body.title,
//       description: body.description,
//       image: body.image,
//       user: "62b509c3635d0961138e52a1",
//     });

//     return user;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// });

const login = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    // login User
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.logindata = action.payload.data;
        state.loginError = "";
      }
      if (action.payload.response) {
        state.loginError = action.payload.response.data.message;
        state.logindata = "";
      }
    },

    // SignUp User
    [signupUser.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.signupdata = action.payload.data;
        state.signupError = "";
      }
      if (action.payload.response) {
        state.signupError = action.payload.response.data.message;
        state.signupdata = "";
      }
    },
    // [addBlog.fulfilled]: (state, action) => {
    //   console.log(action.payload.data);
    //   console.log(action.payload.response.data.message);
    // },
  },
});

export default login.reducer;
