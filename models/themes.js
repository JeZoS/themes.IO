const mongoose = require("mongoose");

const themeSchema = mongoose.Schema({
  title: String,
  platform: String,
  creator: String,
  tags: [String],
  file: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: new Date(),
  },
});

module.exports = Theme = mongoose.model("theme",themeSchema)