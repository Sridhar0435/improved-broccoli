import {
  SET_PENDING_ACTION,
  RESET_PENDING_ACTION,
  SET_MYPENDING_ACTION,
  RESET_MYPENDING_ACTION,
  SET_MYINPROGRESS_TASKS,
  RESET_MYINPROGRESS_TASKS,
  SET_MYGROUPPENDING_ACTION,
  RESET_MYGROUPPENDING_ACTION,
  SET_MYGROUPUNASSIGN_TASKS,
  RESET_MYGROUPUNASSIGN_TASKS,
  RESET_ALL,
  SET_RANGE_PENDING_ACTION,
  RESET_RANGE_PENDING_ACTION,
  SET_RANGE_MYGROUPPENDING_ACTION,
  RESET_RANGE_MYGROUPPENDING_ACTION,
  SET_RAF_PENDING_ACTION_CT06,
  RESET_RAF_PENDING_ACTION_CT06,
} from './Type'
export const set_pendingAction = (data: any) => {
  return {
    type: SET_PENDING_ACTION,
    payload: data,
  }
}
export const reset_pendingAction = () => {
  return {
    type: RESET_PENDING_ACTION,
  }
}

export const set_mypendingAction = (data: any) => {
  return {
    type: SET_MYPENDING_ACTION,
    payload: data,
  }
}
export const reset_mypendingAction = () => {
  return {
    type: RESET_MYPENDING_ACTION,
  }
}
export const set_myinprogressAction = (data: any) => {
  return {
    type: SET_MYINPROGRESS_TASKS,
    payload: data,
  }
}
export const reset_myinprogressAction = () => {
  return {
    type: RESET_MYINPROGRESS_TASKS,
  }
}
export const set_mygrouppendingAction = (data: any) => {
  return {
    type: SET_MYGROUPPENDING_ACTION,
    payload: data,
  }
}
export const reset_mygrouppendingAction = () => {
  return {
    type: RESET_MYGROUPPENDING_ACTION,
  }
}
export const set_mygroupunassignAction = (data: any) => {
  return {
    type: SET_MYGROUPUNASSIGN_TASKS,
    payload: data,
  }
}
export const reset_mygroupunassignAction = () => {
  return {
    type: RESET_MYGROUPUNASSIGN_TASKS,
  }
}

export const reset_all = () => {
  return {
    type: RESET_ALL,
  }
}

export const set_range_pendingAction = (data: any) => {
  return {
    type: SET_RANGE_PENDING_ACTION,
    payload: data,
  }
}
export const reset_range_pendingAction = () => {
  return {
    type: RESET_RANGE_PENDING_ACTION,
  }
}
export const set_range_grouppendingAction = (data: any) => {
  return {
    type: SET_RANGE_MYGROUPPENDING_ACTION,
    payload: data,
  }
}
export const reset_range_grouppendingAction = () => {
  return {
    type: RESET_RANGE_MYGROUPPENDING_ACTION,
  }
}

export const set_raf_pendingAction_CT06 = (data: any) => {
  return {
    type: SET_RAF_PENDING_ACTION_CT06,
    payload: data,
  }
}
export const reset_raf_pendingAction_CT06 = () => {
  return {
    type: RESET_RAF_PENDING_ACTION_CT06,
  }
}
