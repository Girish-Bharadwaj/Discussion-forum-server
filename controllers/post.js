const posts = require("../db/posts");
const users = require("../db/users");
const comments = require("../db/comments");
const createPost = async (req, res) => {
  try {
    let data = await req.body;
    const post = new posts({ ...data, createdBy: userId });
    const user = await users.findById(userId);
    const postsCreated = user.postsCreated || [];
    postsCreated.push(post._id);
    user.postsCreated = postsCreated;
    await user.save();
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "failed" });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPosts = await posts
      .find()
      .populate("createdBy", "username")
      .populate({
        path: "comments",
        select: "content user date",
        populate: {
          path: "user",
          select: "username",
        },
      });
    res.status(200).json(getPosts);
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await posts
      .findById(postId)
      .populate("createdBy", "username")
      .populate({
        path: "comments",
        select: "content user date",
        populate: {
          path: "user",
          select: "username",
        },
      });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

const updatePosts = async (req, res) => {
  try {
    const postBody = await req.body;
    console.log(postBody.heading, postBody.body);
    const postId = postBody.postId;
    const post = await posts.find({ _id: postId });
    if (post[0].userID == userId) {
      await post[0].updateOne({
        ...post,
        heading: postBody.heading,
        body: postBody.body,
      });
      await post[0].save();
      res.status(200).json({ message: "updatedSuccessfully" });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error" });
  }
};

const postComment = async (req, res) => {
  try {
    const commentBody = await req.body;
    const postId = commentBody.postId;
    const post = await posts.find({ _id: postId });
    const comment = new comments({
      ...commentBody,
      post: postId,
      user: userId,
    });
    post[0].comments.push(comment._id);
    const user = await users.findById(userId);
    await post[0].save();
    await comment.save();
    let body = {
      ...comment,
      user: { username: user.username },
    };
    res.status(200).json({
      content: comment.content,
      date: comment.date,
      user: { username: user.username },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error" });
  }
};

module.exports = { createPost, getPosts, postComment, getPostById };
