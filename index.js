console.log("Hello World!");
const express = require("express");
const app = express();

app
  .use(express.static("static"))
  .set("view engine", "ejs")
  .set("views", "views");

  .get("/index", (req, res) => {
    res.send("<h1>This is the login page.</h1>");
  })

  .listen§(2023);