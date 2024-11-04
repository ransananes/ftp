import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const FileDialog = ({
  title,
  file = null,
  isFolder,
  open,
  onClose,
  onCreate,
  currentDirectory,
}) => {
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    // creation functions (folder or file)
    if (isFolder) onCreate(folderName, description, currentDirectory);
    else onCreate(file, description, currentDirectory);
    // close & reset inputs
    handleClose();
  };

  const handleClose = () => {
    // Clear the inputs
    setFolderName("");
    setDescription("");
    // onclose func from parent
    onClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "500px",
            minWidth: "500px",
            maxWidth: "500px",
            margin: "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </DialogTitle>{" "}
        <DialogContent>
          {isFolder && (
            <TextField
              autoFocus
              margin="dense"
              label="Folder Name"
              type="text"
              fullWidth
              variant="outlined"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          )}
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default FileDialog;
