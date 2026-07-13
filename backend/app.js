const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

module.exports = app;
