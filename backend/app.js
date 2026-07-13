const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const connectToDB = require("./db/db");
connectToDB();

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

module.exports = app;
