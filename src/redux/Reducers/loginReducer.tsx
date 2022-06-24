import {
  GET_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
  GET_APPS_REQUEST,
  GET_APPS_SUCCESS,
  GET_APPS_ERROR,
  USER_TOKEN_EXPIRED_ERROR,
  REFRESH_APPS_ARRAY,
  REFRESH_ROLES_ARRAY,
  REFRESH_USERDETAILS,
  SET_NO_ACCESS,
  SET_MENU_LIST,
  SAVE_APP_FUNC_ARRAY,
  INCREMENT,
} from '../Actions/Login/Type'

const initLoginState = {
  error: false,
  isLoading: false,
  // isRoleLoading: false,
  // isAppLoading: false,
  user: undefined,
  errorMessage: '',
  hasAccess: true,
  userDetail: undefined,
  rolesArray: undefined,
  appsArray: undefined,
  menuList: undefined,
  appFuncList: undefined,
  isTokenExpired: false,
  value: 1,
  logoutClicked: false,
}

const loginReducer = (state = initLoginState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        user: undefined,
        errorMessage: '',
        error: false,
        isTokenExpired: false,
        logoutClicked: false,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: payload,
        logoutClicked: false,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        user: payload,
        error: false,
        value: 0,
        logoutClicked: false,
      }
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isTokenExpired: false,
        error: false,
        errorMessage: '',
        hasAccess: true,
      }
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        user: undefined,
        error: false,
        errorMessage: '',
        logoutClicked: true,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        // isLoading: false,
        userDetail: payload,
        error: false,
        hasAccess: true,
      }
    case GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userDetail: undefined,
        error: true,
        errorMessage: payload,
      }
    case GET_ROLES_REQUEST:
      return {
        ...state,
        // isRoleLoading: true,
        isTokenExpired: false,
        error: false,
        errorMessage: '',
      }
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rolesArray: payload,
        error: false,
      }
    case GET_ROLES_ERROR:
      return {
        ...state,
        isLoading: false,
        rolesArray: undefined,
        error: true,
        errorMessage: payload,
      }
    case GET_APPS_REQUEST:
      return {
        ...state,
        // isAppLoading: true,
        isTokenExpired: false,
        error: false,
        errorMessage: '',
      }
    case GET_APPS_SUCCESS:
      return {
        ...state,
        // isLoading: false,
        appsArray: payload,
        error: false,
      }
    case GET_APPS_ERROR:
      return {
        ...state,
        isLoading: false,
        appsArray: undefined,
        error: true,
        errorMessage: payload,
      }
    case REFRESH_APPS_ARRAY:
      return {
        ...state,
        appsArray: {},
      }
    case REFRESH_ROLES_ARRAY:
      return {
        ...state,
        rolesArray: {},
      }
    case REFRESH_USERDETAILS: {
      return {
        ...state,
        userDetail: {},
        menuList: [],
        appFuncList: [],
      }
    }
    case USER_TOKEN_EXPIRED_ERROR:
      return {
        ...state,
        isLoading: false,
        // isAppLoading: false,
        // isRoleLoading: false,
        userDetail: undefined,
        rolesArray: undefined,
        appsArray: undefined,
        isTokenExpired: true,
        error: false,
      }
    case SET_NO_ACCESS:
      return {
        ...state,
        hasAccess: payload,
      }
    case SET_MENU_LIST:
      return {
        ...state,
        menuList: payload,
      }
    case SAVE_APP_FUNC_ARRAY:
      return {
        ...state,
        appFuncList: payload,
      }
    case INCREMENT:
      return {
        ...state,
        value: 1,
      }
    default:
      return state
  }
}

//export { loginReducer }
export default loginReducer
