const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const characterRoutes = require("./routes/characters");
const commentRoutes = require("./routes/comments");
const storyRoutes = require("./routes/stories");
const userRoutes = require("./routes/users");

const app = express();

// MongoDB connection variable, located in an external file
const db = process.env.MongoDB_PW;

// Connects to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true
})
    .then(() => {
        console.log("Database connection established!");
    })
    .catch(() => {
        console.log("Error! No database connection!");
  }
);

// Removes depreciation error for ensureIndex
mongoose.set('useCreateIndex', true); 

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Sets static folder for images
app.use("/images", express.static(path.join("images")));

// CORS - Cross-Origin Resource Sharing. Helps to expose the api to the client.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

// Api routes
app.use("/api/characters", characterRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/user", userRoutes);

module.exports = app;