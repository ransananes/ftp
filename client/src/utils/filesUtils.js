import { fileTypes } from "../constants/fileTypes";

export function getFileExtension(filename) { 
    // Get the file extension
    const extension = filename.split('.').pop().toLowerCase();

    // Return the file extension
    return fileTypes[extension] || 'unknown';
}
