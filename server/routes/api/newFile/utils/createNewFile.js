// Create New File
const FileModel = require('../../../../modules/file'); 

const createNewFile = (fileName, currentDir, size , creationDate , description, res) => {
  // Save to DB
  const newFile = new FileModel({
    filePath: currentDir,
    fileName: fileName,
    creationDate: creationDate,
    Size: size,
    isFolder: false,
    Description: description,
  });

  try {
    newFile.save();
    return res.status(200).json({
      status: "File Uploaded Successfully!",
    });
  } catch (dbError) {
    return res.status(500).json({
      status: "Error saving to database!",
      error: dbError,
    });
  }
};

module.exports = createNewFile;
