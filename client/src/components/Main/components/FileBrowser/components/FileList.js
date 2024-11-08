import React, { useState } from "react";
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
  TablePagination,
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

// Styled TablePagination component
const StyledTablePagination = styled(TablePagination)`
  .MuiTablePagination-toolbar {
    background-color: #333333;
    color: white;
  }

  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows {
    color: gray;
  }

  .MuiTablePagination-actions button {
    color: #3c8dbc;
  }
  .Mui-disabled {
    color: gray !important;
  }
`;

const FileList = ({ files, onFileClick }) => {
  const classes = useStyles();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sort files so folders appear first
  const sortedFiles = files.slice().sort((a, b) => b.isFolder - a.isFolder);

  const filesToDisplay = sortedFiles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesToDisplay.length > 0 ? (
              filesToDisplay.map((file, i) => (
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
                        onClick={() => console.log("clicked")}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" className={classes.white}>
                  This directory seems to be empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <StyledTablePagination
        sx={{
          display: "flex",
          borderRadius: "8px 8px 0 0",
          border: "1px solid transparent",
          bottom: 0,
          marginTop: "1em",
          justifyContent: "center",
          padding: "16px 0",
        }}
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>


    </>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onNewFolderClick: PropTypes.func,
};

export default FileList;
