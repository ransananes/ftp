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

  const openFileUploadDialog = () => {
    setIsFolderDialog(false);
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
        onRefreshClick={onRefreshList}
        onLocationClick={(location) => changeDirectory(location.drive)}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        previousEnabled={history.length > currentIndex + 1}
      />
      <FileDialog
        title={isFolderDialog ? "Create New Folder" : "Upload File"}
        isFolder={isFolderDialog}
        currentDirectory={currentDirectory}
        open={dialogOpen}
        onClose={handleCloseDialog}
        onCreate={isFolderDialog ? onFolderCreate : onFileClick}
      />
    </>
  );
};

export default LocalFileBrowser;
