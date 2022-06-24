import { SET_EMPLOYEE_ID, RESET_EMPLOYEE_ID } from "../Actions/ManageUser/Type";
const initEmpState = {
  empDetails: undefined,
  // firstName: "",
  // middleName:""
};
const manageUserReducer = (state = initEmpState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_EMPLOYEE_ID:
      return {
        empDetails: payload,
      };
    case RESET_EMPLOYEE_ID:
      return state;
    default:
      return state;
  }
};

export default manageUserReducer;
