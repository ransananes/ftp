import {
    CREATE_FILE,
    RETRIEVE_FILE,
    UPDATE_FILE,
    DELETE_FILE,
  } from "../actions/types";
  
  const initialState = [];
  
  function filesReducers(files = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_FILE:
        return [...files, payload];
  
      case RETRIEVE_FILE:
        return payload;
  
      case UPDATE_FILE:
        return payload;

      case DELETE_FILE:
        return files.filter(({ id }) => id !== payload.id);

        default:
        return files;
    }
  };
  
  export default filesReducers