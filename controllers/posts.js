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
  const theme = new Theme(req.body)
  const created = await theme.save()
  console.log(created)
  const del = await Theme.findByIdAndRemove(req.params.id)
  console.log(del)
  res.send("ok");
};

const deletePost = (req, res) => {};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
};
