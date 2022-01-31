/* eslint-disable */
import React, { useEffect, useState } from "react";
import FileBrowser from "./FileBrowser/index";
const axios = require('axios');
const fileApi = "http://localhost:5000/";
const initalDirectory = "/";

function pathJoin(parts, sep) {
    var separator = sep || "/";
    var replace   = new RegExp(separator+"{1,}", "g");
    return parts.join(separator).replace(replace, separator);
 }

 

const LocalFileBrowser = () => {
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState(initalDirectory);

    const [history, setHistory] = useState([initalDirectory]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const [locations, setLocations] = useState([]);
    
    const [selectedFile, setSeletedFile] = useState();
    // const [fileContent, setFileContent] = useState(false);

    useEffect(() => {
        getFilesFromDir();
    }, [currentDirectory]);

    // useEffect(() => {
        // getFilesFromDir();
    // }, [currentFiles]);


    const onFileClick = (file) => {
        if (file.isFolder) {
            const nextDirectory = pathJoin([currentDirectory, file.fileName]) + "/";
            changeDirectory(nextDirectory);
        } else {
            setSeletedFile(file);
            // getFileContent(file);
        }
    };
    const getFilesFromDir = () => {
        // change to unicode to prevent bugs
        var url_link = currentDirectory.replaceAll("/","002F")
        console.log(url_link);
        axios.get(fileApi+`api/ls/${url_link}`)
        .then(response => {
            if(response.data.files == null) 
            {
                setCurrentFiles([])
            }
            else{
                setCurrentFiles(() => response.data.files.map(file => ({ ...file, kind: file.isFolder ? "folder" : "document", size: file.Size || file.fileSizeInBytes })))
            }
            })};
        
    const onFolderCreate = () => {
        var folder_name = prompt("Create the folder")
        // checks if folder name is valid
        if(!isValid(folder_name) || (folder_name.includes("002F")))
        { 
            alert("Can't create folder with the name " + folder_name);
            return;
        }
        var description_folder = prompt("Enter Description to Folder");
        if(description_folder.length === 0)
        {
            alert("Can't leave empty description")
            return;
        }
        var item = {'name': folder_name, 'isFolder': true,'current_dir': currentDirectory, 'description' : description_folder}
        axios.post(fileApi+'api/addNewFile/',item)
            .then(response => {alert(response.data.status); getFilesFromDir();})   
            .catch(error => alert(error));
            
    }

    const changeDirectory = (newDirectory) => {
        setCurrentDirectory(newDirectory);
        setHistory((prev) => [newDirectory, ...prev.slice(currentIndex)]);
        setCurrentIndex(0);
    };
    var isValid=(function(){
        var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
        var rg2=/^\./; // cannot start with dot (.)
        var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
        return function isValid(fname){
          return rg1.test(fname)&&!rg2.test(fname)&&!rg3.test(fname);
        }
      })();
    // const getFileContent = (file) => {
    //     const filePath = pathJoin([currentDirectory, file.name]);
    //     try {
    //         fetch(fileApi + "read/" + encodeURIComponent(filePath)).then(res => {
    //             if (!res.ok) {
    //                 setFileContent("");
    //             }
    //             res.text().then(content => {
    //                 setFileContent(content);
    //             });
    //         });
    //     }  catch{
    //         setFileContent("");
    //     }
    // };

    const onPreviousClick = () => {
        setCurrentDirectory(history[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
    };

    const onNextClick = () => {
        setCurrentDirectory(history[currentIndex - 1]);
        setCurrentIndex(currentIndex - 1);
    };

    // const saveContent = async (file, content) => {
        // const filePath = pathJoin([currentDirectory, file.name]);
        // await fetchPost(fileApi + "update/" + encodeURIComponent(filePath), { content });
    // };

    // if (selectedFile) {
    //     if (fileContent === false) {
    //         return "Opening File..";
    //     } else if (fileContent === "") {
    //         alert("File is empty or not readable");
    //         setSeletedFile("");
    //         setFileContent(false);
    //         return null;
    //     }
    // }

    return <FileBrowser
        currentDirectory={currentDirectory}
        currentFiles={currentFiles}
        locations={locations}
        nextEnabled={currentIndex > 0 && history.length > 0}
        onFileClick={onFileClick}
        onFolderCreate={onFolderCreate}
        onLocationClick={location => changeDirectory(location.drive)}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        previousEnabled={history.length > currentIndex + 1}
    />;
};


export default LocalFileBrowser;