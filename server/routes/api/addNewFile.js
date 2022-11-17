const express = require("express");
const router = express.Router();
const fs = require("fs");

// path location for uploading files
const data = require("../../constants/data");
const path = data.path;

// multer configuration
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path+req.headers.directory)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})
const upload = multer({ storage: storage });

// File Model
const file = require("../../modules/file");

// Date function
const date = require("../../utils/utils");

router.post("/", upload.single("file"), async (req, res) => {
  // configure the file_obj as json
  const { name, isFolder, current_dir, description } = req.body;
  // get current Date
  let date_added = date.getDate();
  if (isFolder) {
    fs.mkdir(path + current_dir + name, (err) => {
      if (err) {
        return res.status(400).json({
          status: "Error has occured while creating the folder!",
        });
      }
      // get current Date
      let date_added = date.getDate();
      // get size - fix later
      const size = 0;
      // saves to db
      console.log(current_dir)
      const newFile = new file({
        filePath: current_dir,
        fileName: name,
        Date_added: date_added,
        Size: size,
        isFolder: isFolder,
        Description: description,
      });
      newFile.save();
      return res.status(200).json({
        status: "Folder Created Successfuly!",
      });
    });
  }
  // must've been a file
  else {
    const { size, filename} = req.file;

      // saves to db
      const newFile = new file({
        filePath: req.headers.directory,
        fileName: filename,
        Date_added: date_added,
        Size: size,
        isFolder: false,
        Description: "null",
      });
      newFile.save();
      return res.status(200).json({
        status: "File Uploaded Successfuly!",
      });
  }
});



module.exports = router;
