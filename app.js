const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const characterRoutes = require("./routes/characters");
const commentRoutes = require("./routes/comments");
const storyRoutes = require("./routes/stories");

const app = express();


// MongoDB connection string
const url = "mongodb://storm:fullzap1@ds153096.mlab.com:53096/mindstorm"

mongoose.connect (url)
    .then(() => {
        console.log("Database connection established!");
    })
    .catch(() => {
        console.log("Error! No database connection!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS - Cross-Origin Resource Sharing. This helps to expose the api to the client.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use("/api/characters", characterRoutes);
app.use("api/comments", commentRoutes);
app.use("api/stories", storyRoutes);

module.exports = app;