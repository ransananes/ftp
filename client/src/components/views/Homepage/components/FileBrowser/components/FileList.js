import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead, TableRow } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RefreshIcon from "@material-ui/icons/Refresh";
import FileUpload from "./FileUpload";
import { formatBytes } from "../../../../../../utils/utils";

const useStyles = makeStyles(() => ({
  white: {
    color: "white",
  },
  gray: {
    color: "gray",
  },
  header: {
    borderRight: "1px solid #3c3c3c",
  },
  evenRow: {
    backgroundColor: "#2a2b33",
  },
  table: {
    cursor: "pointer",
  },
}));

const StyledFileButtons = styled(Grid)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: #232329;
  min-height: 700px;
  border: 1px solid #545353;
`;

const StyledFolderIcon = styled(FolderIcon)`
  color: gray;
  vertical-align: bottom;
  font-size: 20px !important;
  margin-right: 4px;
`;

const StyledFileIcon = styled(InsertDriveFileIcon)`
  color: gray;
  vertical-align: bottom;
  font-size: 20px !important;
  margin-right: 4px;
`;
const StyledCloudDownloadIcon = styled(CloudDownloadIcon)`
  color: white;
  vertical-align: bottom;
  font-size: 20px !important;
  margin-right: 4px;
`;
const StyledCreateNewFolder = styled(CreateNewFolderIcon)`
  color: white;
  vertical-align: bottom;
  cursor: pointer;
  font-size: 30px !important;
  margin-right: 4px;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: white;
  vertical-align: bottom;
  cursor: pointer;
  font-size: 25px !important;
  margin-right: 4px;
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  color: white;
  vertical-align: bottom;
  cursor: pointer;
  font-size: 30px !important;
  margin-right: 4px;
`;
const FileList = ({
  files,
  onFileClick,
  onNewFolderClick,
  onRefreshClick,
  currentDirectory,
}) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Grid item align="center">
        <StyledRefreshIcon onClick={() => onRefreshClick()} />
        <StyledCreateNewFolder onClick={() => onNewFolderClick()} />
      </Grid>
      <Grid></Grid>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={`${classes.white} ${classes.header}`}>
              Name
            </TableCell>
            <TableCell className={`${classes.gray} ${classes.header}`}>
              Date Modified
            </TableCell>
            <TableCell className={`${classes.gray} ${classes.header}`}>
              Size
            </TableCell>
            <TableCell className={classes.gray}>Kind</TableCell>
            <TableCell className={classes.gray}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files &&
            files.map((file, i) => {
              return (
                <TableRow
                  key={file._id}
                  className={i % 2 === 0 ? classes.evenRow : ""}
                  onClick={() => onFileClick(file, i)}
                >
                  <TableCell
                    className={classes.white}
                    component="th"
                    scope="row"
                  >
                    {file.isFolder ? <StyledFolderIcon /> : <StyledFileIcon />}
                    {file.fileName}
                  </TableCell>
                  <TableCell className={classes.gray}>
                    {file.creationDate}
                  </TableCell>
                  <TableCell className={classes.gray} align="right">
                    {formatBytes(file.size)}
                  </TableCell>
                  <TableCell className={classes.gray}>{file.kind}</TableCell>
                  <TableCell className={classes.gray}>
                    {file.Description}
                  </TableCell>
                  {file.isFolder ? (
                    <TableCell className={classes.gray}>
                      {" "}
                      <StyledFavoriteBorderIcon
                        onClick={() => {
                          console.log("clicked");
                        }}
                      />{" "}
                    </TableCell>
                  ) : (
                    <TableCell className={classes.gray}>
                      {" "}
                      <StyledCloudDownloadIcon />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <StyledFileButtons justifyContent="center">
        <FileUpload currentDirectory={currentDirectory} />
      </StyledFileButtons>
    </TableContainer>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onNewFolderClick: PropTypes.func,
};

export default FileList;
