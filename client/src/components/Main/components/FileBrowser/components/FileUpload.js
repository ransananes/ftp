import React from "react";
import { Button } from "@mui/material";

function FileUpload({ onFileUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file); 
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button 
          variant="contained" 
          component="span"
          color="primary"
          sx={{ margin: '10px' }}
        >
          Upload File
        </Button>
      </label>
    </div>
  );
}

export default FileUpload;
