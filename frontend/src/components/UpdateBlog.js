import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTitle,
  updateDescription,
  updateImage,
} from "../reducer/blogsReducer";
// import { ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

function UpdateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.blog;
  });

  const updateHandler = async (id, title, description, image) => {
    console.log(id, title, image);
    const { data } = await axios.patch(`api/blog/${id}`, {
      title,
      description,
      image,
    });
    console.log(data);
    if (data.message === "Blog is Updated") {
      navigate("/allblogs");
    }
  };

  return (
    <div
      className="container "
      style={{
        marginTop: "80px",
        border: "2px solid black",
        borderRadius: "25px",
      }}
    >
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Update Blog </h1>
      <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Title of Blog"
            value={user.update.title}
            // user.update.title ||
            onChange={(e) => {
              dispatch(updateTitle(e.target.value));
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Description"
            value={user.update.description}
            // user.update.description ||
            onChange={(e) => {
              dispatch(updateDescription(e.target.value));
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
              dispatch(updateImage(e.target.value));
            }}
          />
        </Form.Group>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            onClick={() => {
              updateHandler(
                user.update.id,
                user.update.title,
                user.update.description,
                user.update.image
              );
            }}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateBlog;
