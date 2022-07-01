const mongoose = require("mongoose");
const blogModel = require("../model/blog-model");
const userModel = require("../model/user-model");

const addBlog = async (req, res, next) => {
  try {
    const { title, description, image, user } = req.body;
    console.log(user);

    const existUser = await userModel.findById(user);
    console.log(existUser);
    if (!existUser) {
      throw new Error("This user is not Exist");
    } else {
      const blog = await new blogModel({
        title,
        description,
        image,
        user,
      });

      // creating seession
      // const session = await mongoose.startSession();
      // session.startTransaction();
      // await blog.save({ session });
      // existUser.blogs.push(blog);
      // await existUser.save({ session });
      // await session.commitTransaction();
      await blog.save();
      console.log(blog);
      await existUser.blogs.push(blog);
      // console.log(blog);
      await existUser.save();

      res.status(201).json({ message: "New Blog is Created" });
    }
  } catch (err) {
    err.status = "fail";
    err.statusCode = 400;
    next(err);
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("user");
    return res.status(200).json({ blogs });
    // if (!blogs) {
    //   return res.status(400).json({ message: "No Blog" });
    // }
  } catch (error) {}
  return res.status(400).json({ error });
};

const blogById = async (req, res) => {
  try {
    const userBlog = await userModel
      .findById({ _id: req.params.id })
      .populate("blogs");
    return res.status(200).json({ blogs: userBlog });
  } catch (error) {}
  return res.status(400).json({ error });
};

const deleteBlogById = async (req, res) => {
  try {
    let blog = await blogModel
      .findByIdAndRemove({ _id: req.params.id })
      .populate("user");
    console.log(`hellow ${blog}`);
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({ message: "Blog is Deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const update = req.body;
    const blogs = await blogModel.findByIdAndUpdate(
      { _id: req.params.id },
      update,
      { new: true }
    );

    await blogs.save();

    console.log(blogs._id);
    return res.status(200).json({ blogs, message: "Blog is Updated" });
  } catch (error) {}
  return res.status(400).json({});
};

module.exports = { addBlog, getAllBlog, blogById, deleteBlogById, updateBlog };
