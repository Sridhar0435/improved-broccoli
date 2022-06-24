import { RESET_EMPLOYEE_ID, SET_EMPLOYEE_ID } from "./Type";
export const set_empID = (data: any) => {
  return {
    type: SET_EMPLOYEE_ID,
    payload: data,
  };
};
export const reset_empID = () => {
  return {
    type: RESET_EMPLOYEE_ID,
  };
};
