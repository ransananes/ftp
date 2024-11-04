/* eslint-disable */
import React, { useEffect, useState } from "react";
import FileBrowser from "./FileBrowser/FileBrowser";
import { isValid } from "../../../utils/utils";
import { publicRequest } from "../../../api/requestMethods";
import { getFileExtension } from "../../../utils/filesUtils";
import { toast } from "react-toastify";
import ERROR from "../../../constants/error";
import FileDialog from "./FileBrowser/components/Dialog/FileDialog";
import { createFolder } from "./FileBrowser/components/Dialog/utils/folderUtils";
import FileUpload from "./FileBrowser/components/FileUpload";

const initalDirectory = "/";

// adds "/" at end path, eg. join in python.
function pathJoin(parts, sep) {
  var separator = sep || "/";
  var replace = new RegExp(separator + "{1,}", "g");
  return parts.join(separator).replace(replace, separator);
}

const LocalFileBrowser = () => {
  const [currentFiles, setCurrentFiles] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState(initalDirectory);

  const [history, setHistory] = useState([initalDirectory]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [locations, setLocations] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFolderDialog, setIsFolderDialog] = useState(true);

  useEffect(() => {
    getFilesFromDir();
  }, [currentDirectory]);

  const onFileClick = (file) => {
    if (file.isFolder) {
      const nextDirectory = pathJoin([currentDirectory, file.fileName]) + "/";
      changeDirectory(nextDirectory);
    } else {
      // change string to prevent bugs
      let filePath = pathJoin([currentDirectory, file.fileName]).replaceAll(
        "/",
        "002F"
      );
      publicRequest
        .get(`api/download/${filePath}`, {
          responseType: "blob",
        })
        .then((response) => {
          // Create a URL for the file data
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const filename = file.fileName;

          // create a download link
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          link.style.display = "none";

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          toast.error(ERROR.DOWNLOAD);
        });
    }
  };

  // folder creation
  const onFolderCreate = (folderName, description, currentDirectory) => {
    createFolder(folderName, description, currentDirectory)
      .then(() => {
        toast.success("New Folder Created");
        getFilesFromDir();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // file creation
  const onFileUploadConfirm = (file, description, currentDirectory) => {
    // Prepare data for file upload
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("isFolder", false);
    formData.append("currentDir", currentDirectory);
    formData.append("description", description);

    publicRequest
      .post("api/addNewFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "directory": currentDirectory,
        },
      })
      .then(() => {
        toast.success(`${file.name} uploaded successfully.`);
        getFilesFromDir(); // Refresh the file list
      })
      .catch((error) => {
        toast.error(`${file.name} upload failed: ${error.message}`);
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getFilesFromDir = () => {
    // change string to prevent bugs
    var url_link = currentDirectory.replaceAll("/", "002F");
    publicRequest.get(`api/ls/${url_link}`).then((response) => {
      if (response.data.files == null) {
        setCurrentFiles([]);
      } else {
        setCurrentFiles(() =>
          response.data.files.map((file) => ({
            ...file,
            kind: file.isFolder ? "folder" : getFileExtension(file.fileName),
            size: file.Size || file.fileSizeInBytes,
          }))
        );
      }
    });
  };

  const onRefreshList = () => {
    getFilesFromDir();
  };

  const changeDirectory = (newDirectory) => {
    setCurrentDirectory(newDirectory);
    setHistory((prev) => [newDirectory, ...prev.slice(currentIndex)]);
    setCurrentIndex(0);
  };

  const onPreviousClick = () => {
    setCurrentDirectory(history[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
  };

  const onNextClick = () => {
    setCurrentDirectory(history[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
  };

  // dialog handlers
  const openFolderDialog = () => {
    setIsFolderDialog(true);
    setDialogOpen(true);
  };

  const openFileUploadDialog = (file) => {
    setIsFolderDialog(false);
    setSelectedFile(file);
    setDialogOpen(true);
  };

  return (
    <>
      <FileBrowser
        currentDirectory={currentDirectory}
        currentFiles={currentFiles}
        locations={locations}
        nextEnabled={currentIndex > 0 && history.length > 0}
        onFileClick={onFileClick}
        onNewFolderClick={openFolderDialog}
        onFileUpload={openFileUploadDialog}
        onRefreshClick={onRefreshList}
        onLocationClick={(location) => changeDirectory(location.drive)}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        previousEnabled={history.length > currentIndex + 1}
      />
      <FileDialog
        title={isFolderDialog ? "Create New Folder" : selectedFile.name}
        file={selectedFile}
        isFolder={isFolderDialog}
        currentDirectory={currentDirectory}
        open={dialogOpen}
        onClose={handleCloseDialog}
        onCreate={isFolderDialog ? onFolderCreate : onFileUploadConfirm}
      />
    </>
  );
};

export default LocalFileBrowser;
