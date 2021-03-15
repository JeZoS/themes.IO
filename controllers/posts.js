const Theme = require("../models/themes");

const getAllPosts = async (req, res) => {
  try {
    const allThemes = await Theme.find();
    res.status(200).json(allThemes);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const createPost = (req, res) => {
  try {
    //   const {title,description,}
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const editPost = (req, res) => {};

const deletePost = (req, res) => {};

module.exports = { getAllPosts, createPost, editPost, deletePost };
