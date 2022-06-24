import {
  SET_FILE,
  RESET_FILE,
  SET_ERROR_FILE,
  RESET_ERROR_FILE,
  SET_TASK_FILE,
  RESET_TASK_FILE,
} from './Type'

export const setFile = (data: any) => {
  return {
    type: SET_FILE,
    payload: data,
  }
}

export const resetFile = () => {
  return {
    type: RESET_FILE,
  }
}

export const setErrorFile = (data: any) => {
  return {
    type: SET_ERROR_FILE,
    payload: data,
  }
}

export const resetErrorFile = () => {
  return {
    type: RESET_ERROR_FILE,
  }
}

export const setTaskFile = (data: any) => {
  return {
    type: SET_TASK_FILE,
    payload: data,
  }
}

export const resetTaskFile = () => {
  return {
    type: RESET_TASK_FILE,
  }
}
