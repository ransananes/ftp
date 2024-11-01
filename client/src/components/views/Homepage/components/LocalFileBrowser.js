/* eslint-disable */
import React, { useEffect, useState } from "react";
import FileBrowser from "./FileBrowser/FileBrowser";
import { isValid } from "../../../../utils/utils";
import { server } from "../../../../constants/data";
import { publicRequest } from "../../../../api/requestMethods";
import { getFileExtension } from "../../../../utils/filesUtils";

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

  const [selectedFile, setSelectedFile] = useState();
  // const [fileContent, setFileContent] = useState(false);

  useEffect(() => {
    getFilesFromDir();
  }, [currentDirectory]);

  const onFileClick = (file) => {
    if (file.isFolder) {
      const nextDirectory = pathJoin([currentDirectory, file.fileName]) + "/";
      changeDirectory(nextDirectory);
    } else {
      setSelectedFile(file);
    }
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

  const onFolderCreate = () => {
    let folder_name = prompt("Create the folder");
    if(!folder_name) return;
    // checks if folder name is valid
    if (!isValid(folder_name) || folder_name.includes("002F")) {
      alert("Can't create folder with the name " + folder_name);
      return;
    }
    var description_folder = prompt("Enter Description to Folder");
    if (description_folder.length === 0) {
      alert("Can't leave empty description");
      return;
    }

    let item = {
      name: folder_name,
      isFolder: true,
      currentDir: currentDirectory,
      description: description_folder,
    };
    publicRequest
      .post("api/addNewFile/", item)
      .then((response) => {
        alert(response.data.status);
        getFilesFromDir();
      })
      .catch((error) => alert(error));
  };

  const onRefreshList = () => {
    getFilesFromDir();
  }
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

  return (
    <FileBrowser
      currentDirectory={currentDirectory}
      currentFiles={currentFiles}
      locations={locations}
      nextEnabled={currentIndex > 0 && history.length > 0}
      onFileClick={onFileClick}
      onNewFolderClick={onFolderCreate}
      onRefreshClick={onRefreshList}
      onLocationClick={(location) => changeDirectory(location.drive)}
      onNextClick={onNextClick}
      onPreviousClick={onPreviousClick}
      previousEnabled={history.length > currentIndex + 1}
    />
  );
};

export default LocalFileBrowser;
