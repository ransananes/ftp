import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const api = "http://localhost:5000/api/uploadNewFile"
export default function FileDragDrop() {
    const [files, setFiles] = useState([])
  // eslint-disable-next-line

  useEffect(() => {
    files.forEach(file => {
        console.log(file);
    });
  }, [files])
  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server= {api}
        name="files"
        dropOnPage={true}
        dropOnElement={false}
        labelIdle='<span class="filepond--label-action"> Drag & Drop your files or Browse</span>'
      />
    </div>
  );
}
