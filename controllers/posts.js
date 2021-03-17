const Theme = require("../models/themes");

const getAllPosts = async (req, res) => {
  try {
    const allThemes = await Theme.find();
    res.status(200).json(allThemes);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};

const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try {
    const theme = await Theme.findById(id);
    res.status(200).json(theme);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const createPost = async (req, res) => {
  const { title, platform, file, creator } = req.body;
  try {
    const theme = new Theme({
      title,
      platform,
      creator,
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

const editPost = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (theme) {
      theme.file = req.body.file;
      theme.title = req.body.title;
      theme.creator = req.body.creator;
      theme.platform = req.body.platform;
    }
    const saved = await theme.save();
    res.status(200).json({ saved });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const deletePost = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (theme) {
      await Theme.findByIdAndRemove(req.params.id);
      res.status(200).json({ Message: "Theme Removed" });
    } else {
      res.status(200).json({ Message: "No Such Theme Exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
};
