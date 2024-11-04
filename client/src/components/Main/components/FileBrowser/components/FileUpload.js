import React from "react";
import { Button, Typography } from "@mui/material";

function FileUpload({ onFileUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      onFileUpload(file); // Call the provided function with the selected file
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
