import React, { useEffect, useState } from "react";

import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import Header from "./components/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBlogs from "./components/AddBlogs";
import AllBlogs from "./components/AllBlogs";
import UpdateBlog from "./components/UpdateBlog";
import MyBlogs from "./components/MyBlogs";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/addblog" element={<AddBlogs />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
          <Route path="/myblogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
