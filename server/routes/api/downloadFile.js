const express = require("express");
const path = require("path");
const { folderPath } = require("../../constants/data");

const router = express.Router();

router.get("/:file", async (req, res) => {
  try {
    // get the current filePath
    let filePath = req.url.replaceAll("/002F", "/");
    const fullPath = path.join(folderPath, filePath);
    // Send the file for download
    res.download(fullPath, (err) => {
      if (err) {
        console.error("File download error:", err);
        return res.status(500).send("File not found or cannot be downloaded.");
      }
    });
  } catch (error) {
    console.error("Error handling download request:", error);
    res.status(500).send("An error occurred.");
  }
});

module.exports = router;
