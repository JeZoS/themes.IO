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

const createPost = async (req, res) => {
  const { title, platform, file, creater } = req.body;
  try {
    const theme = new Theme({
      title,
      platform,
      creator:creater,
      file,
    });
    const newTheme = await theme.save();
    res.status(200).json({ message: "Created", theme: newTheme });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const editPost = (req, res) => {};

const deletePost = (req, res) => {};

module.exports = { getAllPosts, createPost, editPost, deletePost };
