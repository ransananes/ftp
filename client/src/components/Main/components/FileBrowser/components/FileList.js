import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatBytes } from "../../../../../utils/utils";

const useStyles = makeStyles(() => ({
  white: {
    color: "white !important",
    padding: "5px",
    textOverflow: "ellipsis !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "150px",
  },
  gray: {
    color: "gray",
  },
  header: {
    borderRight: "1px solid #3c3c3c",
  },
  evenRow: {
    backgroundColor: "#222222",
    "&:hover": {
      backgroundColor: "#3c3d44",
    },
  },
  oddRow: {
    backgroundColor: "#222222",
    "&:hover": {
      backgroundColor: "#3c3d44",
    },
  },
}));

const StyledFolderIcon = styled(FolderIcon)`
  color: gray;
  vertical-align: bottom;
  font-size: 20px !important;
  margin-right: 4px;

  &:hover {
    color: #3c8dbc;
    transform: scale(1.1);
    transition: color 0.3s, transform 0.3s;
  }
`;

const StyledFileIcon = styled(InsertDriveFileIcon)`
  color: gray;
  vertical-align: bottom;
  font-size: 20px !important;
  margin-right: 4px;
  &:hover {
    color: #3c8dbc;
    transform: scale(1.1);
    transition: color 0.3s, transform 0.3s;
  }
`;
const StyledMoreActions = styled(MoreHorizIcon)`
  color: white;
  vertical-align: bottom;
  font-size: 20px !important;
  margin-right: 4px;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: white;
  vertical-align: bottom;
  cursor: pointer;
  font-size: 25px !important;
  margin-right: 4px;
`;

const FileList = ({ files, onFileClick }) => {
  const classes = useStyles();
  // sort the files, so folders first
  const sortedFiles = files.slice().sort((a, b) => {
    return b.isFolder - a.isFolder;
  });
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedFiles &&
            sortedFiles.map((file, i) => {
              return (
                <TableRow
                  key={file._id}
                  className={i % 2 === 0 ? classes.evenRow : classes.oddRow}
                >
                  <TableCell
                    className={classes.white}
                    component="th"
                    scope="row"
                    onClick={() => onFileClick(file, i)}
                    style={{ cursor: "pointer" }}
                  >
                    {file.isFolder ? <StyledFolderIcon /> : <StyledFileIcon />}
                    {file.fileName}
                  </TableCell>
                  <TableCell className={classes.white}>
                    {file.creationDate}
                  </TableCell>
                  <TableCell className={classes.white} align="right">
                    {file.isFolder ? <></> : formatBytes(file.size)}
                  </TableCell>
                  <TableCell className={classes.white}>{file.kind}</TableCell>
                  <TableCell className={classes.white}>
                    {file.Description}
                  </TableCell>
                  {file.isFolder ? (
                    <TableCell className={classes.white}>
                      <StyledFavoriteBorderIcon
                        onClick={() => {
                          console.log("clicked");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  ) : (
                    <TableCell className={classes.white}>
                      <StyledMoreActions
                        style={{ cursor: "pointer" }}
                        onClick={() => onFileClick(file, i)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onNewFolderClick: PropTypes.func,
};

export default FileList;
