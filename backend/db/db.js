const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.DB_Connect)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => console.log(error));
}

module.exports = connectToDB;
