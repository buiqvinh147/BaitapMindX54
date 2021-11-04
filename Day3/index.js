const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
//database connection mongo

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });





//Models
require("../Day3/model/Post");
require("../Day3/model/Comment");

//Middleware
app.use(bodyParser.json()).use(morgan());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Routes
app.use("/posts", require("../Day3/router/post"));

//Not Found Route
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

//error handler

if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack
  });
});

app.listen(9000, function() {
  console.log("Server is running on port 9000");
});