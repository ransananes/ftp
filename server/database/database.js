const mongoose = require("mongoose");
const { db } = require("../constants/data");

// Connect to mongoDB
const database = mongoose
  .connect(db, {})
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log(err));

module.exports = { database };
