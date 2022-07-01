import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Card, Border } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBlog } from "../reducer/blogsReducer";
import { updateData } from "../reducer/blogsReducer";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState("");
  const [del, setDel] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const featchNotes = async () => {
    const { data } = await axios.get("/api/blog/all");
    console.log(data);
    setBlogs(data);
  };
  const deletehan = async (id) => {
    console.log("delete notes");
    const { data } = await axios.delete(`/api/blog/${id}`);

    setDel(data);
  };
  const update = async (id, title, description, image) => {
    dispatch(updateData({ id, title, description, image }));
    navigate("/updateblog");
  };

  useEffect(() => {
    featchNotes();
  }, [del]);

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-center  ">
          <h1 className="mt-3">All Blogs</h1>
          <Link to="/addblog">
            <Button className="mt-3">
              {/* <FiEdit className="mr-2" /> */}
              Create Blogs
            </Button>
          </Link>
        </div>
        <br />
        <br />
        {blogs &&
          blogs.blogs.map((data) => {
            return (
              <Card
                className="border-dark"
                style={{ width: "18rem", marginTop: "15px" }}
              >
                <Card.Img variant="top" src={data.image} />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                  {localStorage.getItem("id").split('"').join("") ===
                    data.user._id && (
                    <>
                      <Button
                        className="btn-primary "
                        onClick={() =>
                          update(
                            data._id,
                            data.title,
                            data.description,
                            data.image
                          )
                        }
                      >
                        Edit
                        {/* <AiFillEdit /> */}
                      </Button>
                      <Button
                        className="btn-danger ml-2 "
                        onClick={() => deletehan(data._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default AllBlogs;
