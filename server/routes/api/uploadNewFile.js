const express = require("express");
const router = express.Router();
const fs = require('fs');

const path = 'C:/FileStorageTest/'
// File Model
const file = require("../../modules/file");

router.post("/", async (req, res) => {
  // configure the file_obj as json
  console.log(req.headers)
  return res.status(200).json({
    status: "Error has occured!"
  });
});



module.exports = router;
