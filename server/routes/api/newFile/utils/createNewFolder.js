const fs = require('fs');
const FileModel = require('../../../../modules/file'); 

// Create New Folder function
const createNewFolder = (fullPath, folderPath, name, creationDate, description, res) => {
  fs.mkdir(fullPath, { recursive: true }, (err) => {
    if (err) {
      return res.status(400).json({
        status: "Error has occurred while creating the folder!",
      });
    }

    // Set size = 0 since folder is empty
    const size = 0;

    // Save to DB
    const newFile = new FileModel({
      filePath: folderPath,
      fileName: name,
      creationDate: creationDate,
      Size: size,
      isFolder: true,
      Description: description,
    });

    newFile.save()
      .then(() => {
        return res.status(200).json({
          status: "Folder Created Successfully!",
        });
      })
      .catch((dbError) => {
        return res.status(500).json({
          status: "Error saving to database!",
          error: dbError,
        });
      });
  });
};

module.exports = createNewFolder;
