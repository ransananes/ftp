const express = require("express");
const router = express.Router();
const fs = require('fs');

const path = 'C:/FileStorageTest/'
// File Model
const file = require("../../modules/file");

router.post("/", async (req, res) => {
  // configure the file_obj as json
  const {
    name,
    isFolder,
    current_dir,
    description,
  } = req.body;

  if(isFolder)
  {
      fs.mkdir(path+current_dir+req.body.name, (err) => {
        if (err) {
          return res.status(400).json({
            status: "Error has occured while creating the folder!"
          });
        }
        var date = new Date();
        var date_added = pad2( date.getDate()) + "/"+ pad2(date.getMonth() + 1) +"/" + date.getFullYear().toString()+ " "+ pad2( date.getHours() ) + ":"+ pad2( date.getMinutes() ) + ":" + pad2( date.getSeconds());
        const size = 0;
        const newItem = new file({
          filePath: current_dir,
          fileName: name,
          Date_added: date_added,
          Size: size,
          isFolder: isFolder,
          Description: description
        });
        newItem.save();
    return res.status(200).json({
      status: "Folder Created Successfuly!"
    });
  })}
});


function pad2(n) { return n < 10 ? '0' + n : n }

module.exports = router;
