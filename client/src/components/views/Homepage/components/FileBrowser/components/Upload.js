import React, { useState } from "react";
import { Button, FormLabel } from "@material-ui/core";
import { publicRequest } from "../../../../../../api/requestMethods";
function Upload({currentDirectory}) {
  const [dialog, setDialog] = useState(false);

  const handleClose = () => {
    setDialog(false);
  };

  const uploadFiles = () => {
    let formData = new FormData();
    let file = document.querySelector("#file");
    formData.append("file", file.files[0]);
    publicRequest.post("/api/addNewFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "directory": currentDirectory
      },
    }).then((response) => {
      alert(response.data.status);
    })
    .catch((error) => alert(error));
  };
  return (
    <>
      <FormLabel style={{ color: "white" }}>
        {" "}
        File :
        <input type="file" id="file" name="file" multiple={true} required />
      </FormLabel>
      <Button label="Upload" variant="contained" primary={true} onClick={uploadFiles} > Upload </Button>,
    </>
  );
}

export default Upload;
