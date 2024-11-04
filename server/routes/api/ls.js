const express = require("express");

const router = express.Router();

// File Model
const file = require("../../modules/file");

router.get("/:currentDirectory", async (req, res) => {
  // get the current url and display the folder within the path
  var url = req.url.replaceAll("/002F", "/");
  url = url.replaceAll("002F", "/");
  file.find({ filePath: url }, function (err, file) {
    return res.status(200).json({
      files: file,
    });
  });
});

module.exports = router;
