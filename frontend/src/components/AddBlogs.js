import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlog,
  updateTitle,
  updateDescription,
} from "../reducer/blogsReducer";
// import { ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

function AddBlogs() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.blog;
  });

  // const updatehandler = async (id, title, description, image) => {
  //   console.log(id, title);
  //   const { data } = await axios.patch(`api/blog/${id}`, {
  //     title,
  //     description,
  //     image,
  //   });
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(title, description, image);
    const data = await dispatch(addBlog({ title, description, image }));
    console.log(data);
    if (data.payload === "New Blog is Created") {
      navigate("/allblogs");
    }
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "80px",
        border: "2px solid black",
        borderRadius: "25px",
      }}
    >
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Create Blog </h1>
      <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Title of Blog"
            value={title}
            // user.update.title ||
            onChange={(e) => {
              // user.update.title
              //   ? dispatch(updateTitle(e.target.value))
              //   :
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Description"
            value={description}
            // user.update.description ||
            onChange={(e) => {
              // user.update.title
              //   ? dispatch(updateDescription(e.target.value))
              //   :
              setDescription(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Image Url"
            multiple
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </Form.Group>

        {/* <Button
          variant="primary"
          onClick={updatehandler(
            user.update.id,
            user.update.title,
            user.update.description,
            user.update.image
          )}
        >
          Update
        </Button> */}
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddBlogs;
