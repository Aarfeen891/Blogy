const express = require("express");
const {
  addBlog,
  getAllBlog,
  blogById,
  deleteBlogById,
  updateBlog,
} = require("../controller/blog-controller");

const blogRouter = express.Router();

blogRouter.route("/add").post(addBlog);
blogRouter.route("/all").get(getAllBlog);
blogRouter.route("/:id").get(blogById).delete(deleteBlogById).patch(updateBlog);

module.exports = blogRouter;
