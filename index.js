const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const posts = require("../server/db/posts");
const authMiddleware = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const app = express();
const port = 5000;
const connectionURL =
  "mongodb+srv://discussionForum:discussionForum@cluster0.nllhb.mongodb.net/discussionForumDB?retryWrites=true&w=majority";
app.use(cors());
app.use(express.json());

app.use("", authRoutes);
app.use("", postRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to REST API of Discussion Forum</h1>");
});

mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
