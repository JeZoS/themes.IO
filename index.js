require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const connectDb = require('./db');
const getPosts = require("./routes/posts")

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb" ,extended: true }));
app.use(cors())
app.use(morgan('dev'))
connectDb()

app.use("/uploads", express.static("uploads"));
app.get('/',(req,res)=>{
    res.send('hello motherfaka')
})
app.use('/posts',getPosts)

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port 5000");
});
