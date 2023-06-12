require("@babel/register");
const express = require("express");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/calendar", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(4123, () => {
  console.log("Server is running on port 4123");
});
