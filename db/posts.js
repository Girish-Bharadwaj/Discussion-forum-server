const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  votesCount: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

const posts = mongoose.model("posts", postsSchema);

module.exports = posts;
