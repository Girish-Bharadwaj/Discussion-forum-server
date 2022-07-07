const express = require("express");
const {
  signUp,
  login,
  updateProfile,
  getProfileById,
} = require("../controllers/auth");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const app = express();

app.use(router);

router.post("/signUp", signUp);
router.post("/login", login);
router.put("/profile", authMiddleware, updateProfile);
router.get("/userbyid/:id", getProfileById);

module.exports = router;
