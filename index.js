require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./db");
const getPosts = require("./routes/posts");
const authUser = require("./routes/user");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
connectDb();

app.use("/uploads", express.static("uploads"));

app.use("/posts", getPosts);
app.use("/user", authUser);

const root = require("path").join(__dirname, "mini", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port 5000");
});
