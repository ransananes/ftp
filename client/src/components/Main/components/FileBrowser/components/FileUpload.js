import React from "react";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { server } from "../../../../../constants/data";

const { Dragger } = Upload;

function FileUpload({ currentDirectory }) {
  const uploadProps = {
    name: "file",
    multiple: false,
    action: `${server}api/addNewFile`,
    headers: {
      directory: currentDirectory, 
    },
    data: {
      currentDir: currentDirectory,
      description: "add description format",
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        console.log("Uploading file:", info.file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      return true; 
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...uploadProps} style={{backgroundColor: "white", width:"70%", margin:"auto", marginTop:"2rem"}}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Upload a single file.</p>
    </Dragger>
  );
}

export default FileUpload;
