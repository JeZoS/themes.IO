const Theme = require("../models/themes");

const getAllPosts = async (req, res) => {
  try {
    const allThemes = await Theme.find();
    res.status(200).send(allThemes);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
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
    await theme.save();
    res.status(200).json({ Message: "Theme Created"});
  } catch (err) {
    res.status(404).json({
      error: err,
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
    res.status(200).json({ Message : "Removed" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const deletePost = async (req, res) => {
  console.log("hit delete")
  try {
    const theme = await Theme.findById(req.params.id);
    await Theme.findByIdAndRemove(req.params.id);
    res.status(200).json({ Message: "Theme Removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
};
