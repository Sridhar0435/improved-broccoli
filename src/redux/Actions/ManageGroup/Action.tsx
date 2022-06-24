import { SET_GROUP_ID, RESET_GROUP_ID } from './Type'

export const set_groupID = (groupdata: any) => {
  return {
    type: SET_GROUP_ID,
    payload: groupdata,
  }
}
export const reset_groupID = () => {
  return {
    type: RESET_GROUP_ID,
  }
}
