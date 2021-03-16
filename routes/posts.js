const express = require("express");
const {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  editPost,
} = require("../controllers/posts");
const multer = require("multer");
//

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // console.log(req);
    var filname =
      file.originalname +
      new Date().toISOString() +
      "." +
      file.mimetype.split("/")[1];
    req.body.file = filname;
    cb(null, filname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.post("/", upload.any(), createPost);
router.patch("/", editPost);
router.delete("/", deletePost);

module.exports = router;
