import { publicRequest } from "../../../../../../../api/requestMethods"; // Adjust the import path as needed
import ERROR from "../../../../../../../constants/error";
import { isValid } from "../../../../../../../utils/utils";


export const createFolder = (folderName, description, currentDirectory) => {
  return new Promise((resolve, reject) => {
    // checks if name exists
    if (!folderName) {
      reject(new Error(ERROR.FOLDER));
      return;
    }

    // checks if folder name is valid
    if (!isValid(folderName) || folderName.includes("002F")) {
      reject(new Error(ERROR.FOLDER));
      return;
    }

    if (description.length === 0) {
      reject(new Error(ERROR.DESCRIPTION_REQUIRED));
      return;
    }


    let item = {
      name: folderName,
      isFolder: true,
      currentDir: currentDirectory,
      description: description,
    };

    publicRequest
      .post("api/addNewFile/", item)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(ERROR.FOLDER)); 
      });
  });
};
