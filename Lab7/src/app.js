const express = require("express");
const app = express();
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//Config view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

//Routes
const articleRoutes = require("./routes/article.routes");
app.use("/", articleRoutes);

module.exports = app;