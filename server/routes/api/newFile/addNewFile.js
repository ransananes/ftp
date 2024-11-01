const express = require("express");
const router = express.Router();

// path location for uploading files
const data = require("../../../constants/data");
const path = data.path;

// multer configuration
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path + req.headers.directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});
const upload = multer({ storage: storage });

// File Model

// Date function
const date = require("../../../utils/utils");
const createNewFolder = require("./utils/createNewFolder"); // Use require
const createNewFile = require("./utils/createNewFile");

router.post("/", upload.single("file"), async (req, res) => {
  // configure the file_obj as json
  const { name, isFolder, currentDir, description } = req.body;
  // get current Date
  let creationDate = date.getDate();
  if (isFolder) {
    const fullPath = path + currentDir + name;
    createNewFolder(fullPath, currentDir, name, creationDate, description, res);
  }
  else {
    // upload a file to db
    console.log(currentDir)
    const { size, filename } = req.file;
    createNewFile(filename, currentDir, size , creationDate, description, res);
  }
});

module.exports = router;
