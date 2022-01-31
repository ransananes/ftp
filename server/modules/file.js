const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FilesSchema = new Schema({
  filePath: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  Date_added: {
    type: String,
    required: true,
  },
  Size: {
    type: String,
    required: false,
  },
  isFolder : {
    type: Boolean,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

module.exports = file = mongoose.model("files", FilesSchema);
