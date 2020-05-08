const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");

var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save();

  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   post.save();
//   console.log(post);
//   res.status(201).json({
//     message: "Post added successfully",
//   });
// });

// app.use("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "fadf12421l",
//       title: "First server-side post",
//       content: "This is coming from the server",
//     },
//     {
//       id: "ksajflaj132",
//       title: "Second server-side post",
//       content: "This is coming from the server!",
//     },
//   ];
//   res.status(200).json({
//     message: "Posts fetched succesfully!",
//     posts: posts,
//   });
// });

module.exports = app;
