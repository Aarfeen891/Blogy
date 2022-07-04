const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./router/user-router");
const blogRouter = require("./router/blog-router");

const app = express();
env.config();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("DB connection Successfully");
  })
  .catch((err) => {
    console.log("DB not connected");
  });

app.use("/", userRouter);
app.use("/api/blog", blogRouter);

const Port = process.env.PORT;

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message, status: err.status });
});

app.listen(Port, () => {
  console.log(`Server is Running on Port ${Port} `);
});

const d = new Date();
console.log(d.toDateString());
