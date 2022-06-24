import {
  SET_FILE,
  RESET_FILE,
  SET_ERROR_FILE,
  RESET_ERROR_FILE,
  SET_TASK_FILE,
  RESET_TASK_FILE,
} from '../Actions/FileUpload/Type'

const initialState = {
  fileData: [],
  fileErrorData: [],
  fileManageData: [],
}

const fileReducer = (state = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case SET_FILE:
      return {
        ...state,
        fileData: payload,
      }
    case RESET_FILE:
      return {
        ...state,
        fileData: [],
      }
    case SET_ERROR_FILE:
      return {
        ...state,
        fileErrorData: payload,
      }
    case RESET_ERROR_FILE:
      return {
        ...state,
        fileErrorData: [],
      }
    case SET_TASK_FILE:
      return {
        ...state,
        fileManageData: payload,
      }
    case RESET_TASK_FILE:
      return {
        ...state,
        fileManageData: [],
      }
    default:
      return state
  }
}

export default fileReducer
