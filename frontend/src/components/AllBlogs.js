import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Card, Border } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBlog } from "../reducer/blogsReducer";
import { updateData } from "../reducer/blogsReducer";
import { set } from "mongoose";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState("");
  const [del, setDel] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const now = new Date().toDateString();
  console.log(now);

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
      </div>
      <br />
      <br />
      <div className="container mb-5">
        <div className="d-flex flex-row flex-wrap justify-content-center ">
          {blogs &&
            blogs.blogs.map((data) => {
              return (
                <div>
                  <Card
                    style={{
                      width: "18rem",
                      marginLeft: "20px",
                      marginBottom: "15px",
                      border: "2px solid black",
                    }}
                  >
                    <Card.Img
                      style={{ height: "180px" }}
                      variant="top"
                      src={data.image}
                    />
                    <Card.Body>
                      <div>
                        <Card.Title>{data.title}</Card.Title>

                        <Card.Text>{`${data.description.slice(
                          0,
                          150
                        )}....`}</Card.Text>
                      </div>
                      {localStorage.getItem("id").split('"').join("") ===
                        data.user._id && (
                        <div>
                          <Button
                            className="btn-primary  "
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
                            className="btn-danger ml-2  "
                            onClick={() => deletehan(data._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                      <p class="badge badge-dark">
                        {new Date(data.createdAt).toDateString()}
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
