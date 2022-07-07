const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;
