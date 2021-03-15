const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
} = require("../controllers/posts");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.patch("/", editPost);
router.delete("/", deletePost);

module.exports = router;
