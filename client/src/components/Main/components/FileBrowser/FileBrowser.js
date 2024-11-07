import PropTypes from "prop-types";
import React from "react";

import { Grid2 } from "@mui/material";
import FileWindow from "./components/FileWindow";
import FileList from "./components/FileList";
import LeftSideBar from "./components/LeftSideBar";
import Header from "./components/Header";

const FileBrowser = ({
  locations,
  currentDirectory,
  onLocationClick,
  previousEnabled,
  nextEnabled,
  onPreviousClick,
  onNextClick,
  currentFiles,
  onFileClick,
  onNewFolderClick,
  onFileUpload,
  onRefreshClick,
}) => {
  return (
    <FileWindow>
      <LeftSideBar locations={locations} onLocationClick={onLocationClick} />
      <Grid2 size={10}>
        <Header
          currentDirectory={currentDirectory}
          previousEnabled={previousEnabled}
          nextEnabled={nextEnabled}
          onNewFolderClick={onNewFolderClick}
          onFileUpload={onFileUpload}
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
          onRefreshClick={onRefreshClick}
        />
        <FileList
          files={currentFiles}
          onFileClick={onFileClick}
          currentDirectory={currentDirectory}
        />
      </Grid2>
    </FileWindow>
  );
};

FileBrowser.propTypes = {
  currentDirectory: PropTypes.string,
  currentFiles: PropTypes.array,
  locations: PropTypes.array,
  nextEnabled: PropTypes.bool,
  onFileClick: PropTypes.func,
  onNewFolderClick: PropTypes.func,
  onLocationClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  previousEnabled: PropTypes.bool,
  onRefreshClick: PropTypes.func,
};

export default FileBrowser;
