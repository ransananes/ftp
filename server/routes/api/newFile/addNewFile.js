const express = require("express");
const router = express.Router();

// path location for uploading files
const path = require("path");
const { folderPath } = require("../../../constants/data");
// fs
const fs = require("fs");
// Date function
const date = require("../../../utils/utils");
// creation func
const createNewFolder = require("./utils/createNewFolder"); // Use require
const createNewFile = require("./utils/createNewFile");

// multer configuration
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath + req.headers.directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// upload file and check for existing file
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fullPath = path.join(
      folderPath,
      req.headers.directory,
      file.originalname
    );
    fs.access(fullPath, fs.constants.F_OK, (err) => {
      if (!err) {
        // File already exists
        return cb(new Error("File already exists."), false);
      }
      // File does not exist, proceed with the upload
      cb(null, true);
    });
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  const { name, isFolder, currentDir, description } = req.body;

  if (!name || !currentDir || typeof isFolder === "undefined") {
    return res.status(400).json({ message: "Missing required fields." });
  }

  let creationDate = date.getDate();
  if (typeof isFolder === "boolean") {
    const fullPath = path.join(folderPath, currentDir, name);
    createNewFolder(fullPath, currentDir, name, creationDate, description, res);
  } else {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const { size, filename } = req.file;
    createNewFile(filename, currentDir, size, creationDate, description, res);
  }
});

// Error handler for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

module.exports = router;
