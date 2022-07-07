const express = require("express");
const {
  createPost,
  getPosts,
  postComment,
  getPostById,
} = require("../controllers/post");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const app = express();

app.use(router);

router.post("/post/create", authMiddleware, createPost);
router.post("/post/comment", authMiddleware, postComment);
router.get("/post/get", getPosts);
router.get("/post/getbyid/:id", getPostById);
// router.get('/post/myposts',authMiddleware,getMyPosts)
// router.post('/post/updatepost',authMiddleware,updatePosts)

module.exports = router;
