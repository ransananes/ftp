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
        style={{ display: 'none' }} // Hide the default input
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button 
          variant="contained" 
          component="span" // Use "span" as the component for the label
          color="primary"
          sx={{ margin: '10px' }} // Custom styles
        >
          Upload File
        </Button>
      </label>
    </div>
  );
}

export default FileUpload;
