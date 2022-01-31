import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead, TableRow } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FileDragDrop from '../../filedrop/FileDragDrop';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles(() => ({
    white: {
        color: "white"
    },
    gray: {
        color: "gray"
    },
    header: {
        borderRight: "1px solid #3c3c3c"
    },
    evenRow: {
        backgroundColor: "#2a2b33"
    },
    table: {
        cursor: "pointer"
    }
  }));

const StyledFolderIcon = styled(FolderIcon)`
    color: gray;
    vertical-align: bottom;
    font-size: 20px!important;
    margin-right: 4px;
`;

const StyledFileIcon = styled(InsertDriveFileIcon)`
    color: gray;
    vertical-align: bottom;
    font-size: 20px!important;
    margin-right: 4px;
`;
const StyledCloudDownloadIcon = styled(CloudDownloadIcon)`
    color: white;
    vertical-align: bottom;
    font-size: 20px!important;
    margin-right: 4px;
`;
const StyledCreateNewFolder = styled(CreateNewFolderIcon)`
    color: white;
    vertical-align: bottom;
    cursor: pointer;
    font-size: 40px!important;
    margin-right: 4px;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
    color: white;
    vertical-align: bottom;
    cursor: pointer;
    font-size: 25px!important;
    margin-right: 4px;
`;
const FileList = ({ files, onFileClick, onFolderCreate}) => {
    const classes = useStyles();
    return <TableContainer
    >
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={`${classes.white} ${classes.header}`}>Name</TableCell>
                    <TableCell className={`${classes.gray} ${classes.header}`}>Date Modified</TableCell>
                    <TableCell className={`${classes.gray} ${classes.header}`}>Size</TableCell>
                    <TableCell className={classes.gray}>Kind</TableCell>
                    <TableCell className={classes.gray}>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files && files.map((file, i) => {
                    return <TableRow key={file._id} className={i % 2 === 0 ? classes.evenRow : ""} onClick={() => onFileClick(file, i)}>
                        <TableCell className={classes.white} component="th" scope="row">
                        {
                            file.isFolder ? <StyledFolderIcon /> : <StyledFileIcon />
                        }
                            {file.fileName}
                        </TableCell>
                        <TableCell className={classes.gray}>{file.Date_added}</TableCell>
                        <TableCell className={classes.gray} align="right">{file.size}</TableCell>
                        <TableCell className={classes.gray}>{file.kind}</TableCell>
                        <TableCell className={classes.gray}>{file.Description}</TableCell>
                        {
                        file.isFolder ? <TableCell className={classes.gray}> <StyledFavoriteBorderIcon onClick={() => {
                            console.log("clicked")
                        }}/> </TableCell> : <TableCell className={classes.gray}> <StyledCloudDownloadIcon/></TableCell> 
                         }
                    </TableRow>;
                })}
            </TableBody>
        </Table>
                <FileDragDrop/>
        <StyledCreateNewFolder onClick={() => onFolderCreate()}/>
    </TableContainer>;
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFolderCreate: PropTypes.func,
};

export default FileList;