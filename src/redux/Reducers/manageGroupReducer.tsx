import { SET_GROUP_ID, RESET_GROUP_ID } from '../Actions/ManageGroup/Type'
const initEmpState = {
  groupDetails: undefined,
  // firstName: "",
  // middleName:""
}
const manageGroupReducer = (state = initEmpState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case SET_GROUP_ID:
      return {
        groupDetails: payload,
      }
    case RESET_GROUP_ID:
      return state
    default:
      return state
  }
}

export default manageGroupReducer
