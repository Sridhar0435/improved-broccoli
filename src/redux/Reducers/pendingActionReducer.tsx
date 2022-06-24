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
} from '../Actions/PendingAction/Type'
const initpendingactionState = {
  pendingActionDetails: undefined,
  mypendingAction: undefined,
  myinprogressTasks: undefined,
  mygroupPendingAction: undefined,
  mygroupUnassignTasks: undefined,
  eventPendingAction: undefined,
  eventGroupPendingAction: undefined,
  rafpendingActionDetailsCT06: undefined,
  // firstName: "",
  // middleName:""
}
const pendingActionReducer = (state = initpendingactionState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case SET_PENDING_ACTION:
      return {
        ...state,
        pendingActionDetails: payload,
      }
    case SET_MYPENDING_ACTION:
      return {
        ...state,
        mypendingAction: payload,
      }
    case SET_MYINPROGRESS_TASKS:
      return {
        ...state,
        myinprogressTasks: payload,
      }
    case SET_MYGROUPPENDING_ACTION:
      return {
        ...state,
        mygroupPendingAction: payload,
      }
    case SET_MYGROUPUNASSIGN_TASKS:
      return {
        ...state,
        mygroupUnassignTasks: payload,
      }
    case SET_RANGE_PENDING_ACTION:
      return {
        ...state,
        eventPendingAction: payload,
      }
    case SET_RANGE_MYGROUPPENDING_ACTION:
      return {
        ...state,
        eventGroupPendingAction: payload,
      }
    case SET_RAF_PENDING_ACTION_CT06:
      return {
        ...state,
        rafpendingActionDetailsCT06: payload,
      }

    case RESET_PENDING_ACTION:
      return state
    // case RESET_PENDING_ACTION:
    //   return {
    //     ...state,
    //     pendingActionDetails: undefined,
    //   }
    case RESET_MYPENDING_ACTION:
      return state
    case RESET_MYINPROGRESS_TASKS:
      return state
    case RESET_MYGROUPPENDING_ACTION:
      return state
    case RESET_MYGROUPUNASSIGN_TASKS:
      return state
    case RESET_RANGE_PENDING_ACTION:
      return state
    case RESET_RANGE_MYGROUPPENDING_ACTION:
      return state
    case RESET_RAF_PENDING_ACTION_CT06:
      return state
    case RESET_ALL:
      return {
        pendingActionDetails: [],
        mypendingAction: [],
        myinprogressTasks: [],
        mygroupPendingAction: [],
        mygroupUnassignTasks: [],
        eventPendingAction: [],
        eventGroupPendingAction: [],
        rafpendingActionDetailsCT06: [],
      }
    default:
      return state
  }
}

export default pendingActionReducer
