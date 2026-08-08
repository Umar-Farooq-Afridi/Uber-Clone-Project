const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectToDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");

const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

app.get("/", (request, response) => {
  response.send("<h1>Uber Clone Project by Umar Farooq</h1>");
});
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);

module.exports = app;
