import {
  getUserDetailsAPI,
  getRoleAPI,
  getAppsAPI,
  getUserForAllStatusAPI,
  userV2Login,
} from '../../../api/Fetch'
import { ServiceResponse } from '../../../pages/Login/Messages'
import { apps } from '../../../util/MenuData'
//import { ServiceResponses } from "../../../component/ServiceResponses";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  USER_TOKEN_EXPIRED_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
  GET_APPS_REQUEST,
  GET_APPS_SUCCESS,
  GET_APPS_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  REFRESH_APPS_ARRAY,
  REFRESH_ROLES_ARRAY,
  REFRESH_USERDETAILS,
  SET_NO_ACCESS,
  SET_MENU_LIST,
  SAVE_APP_FUNC_ARRAY,
  INCREMENT,
} from './Type'

export const loginUser = (idToken: any) => (dispatch: any) => {
  console.log('starting')
  dispatch(loginUserRequest())
  userV2Login(idToken)
    .then((result) => {
      const { data } = result
      if ('refresh_token' in data) {
        localStorage.setItem('_GresponseV2', JSON.stringify(data))
        dispatch(getUser(data && data.empId))
      } else {
        throw new Error('Invalid Login')
      }
      dispatch(loginUserSuccess(data))
    })
    .catch((error) => {
      if (error && error.response && error.response.status === 500) {
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: ServiceResponse.getMessage('login', 'serviceUnavailable'),
        })
      } else {
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: ServiceResponse.getMessage('login', 'userNotExist'),
        })
      }
    })
}

export const getUser = (empId: String) => (dispatch: any) => {
  dispatch(getUserRequest())
  dispatch(getUserDetails(empId))

  getUserDetailsAPI(empId)
    .then((response) => {
      getUserInfoSuccess(response && response.data)
    })
    .catch((error) => {
      console.log('Colleague service error')
    })
}

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  }
}

export const increment = () => {
  return {
    type: INCREMENT,
  }
}

export const loginUserSuccess = (data: any) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  }
}

export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  }
}

export const getUserSuccess = (user: any) => {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  }
}

export const getUserError = (error: any) => {
  return {
    type: GET_USER_ERROR,
    payload: error,
  }
}

export const userTokenError = (error: any) => {
  return {
    type: USER_TOKEN_EXPIRED_ERROR,
    payload: error,
  }
}

export const getRolesRequest = () => {
  return {
    type: GET_ROLES_REQUEST,
  }
}

export const getRolesSuccess = (data: any) => {
  return {
    type: GET_ROLES_SUCCESS,
    payload: data,
  }
}

export const getRolesError = (error: any) => {
  return {
    type: GET_ROLES_ERROR,
    payload: error,
  }
}

export const getAppsRequest = () => {
  return {
    type: GET_APPS_REQUEST,
  }
}

export const getAppsSuccess = (data: any) => {
  return {
    type: GET_APPS_SUCCESS,
    payload: data,
  }
}

export const getAppsError = (error: any) => {
  return {
    type: GET_APPS_ERROR,
    payload: error,
  }
}

export const saveAppFuncArray = (appfunc: Array<any>) => {
  return {
    type: SAVE_APP_FUNC_ARRAY,
    payload: appfunc,
  }
}

export const resetAppsArray = () => {
  return {
    type: REFRESH_APPS_ARRAY,
  }
}

export const resetRolesArray = () => {
  return {
    type: REFRESH_ROLES_ARRAY,
  }
}

export const resetUserdetails = () => {
  return {
    type: REFRESH_USERDETAILS,
  }
}

export const getRoleArray = () => (dispatch: any) => {
  dispatch(getRolesRequest())
  getRoleAPI()
    .then((response: any) => {
      dispatch(getRolesSuccess(response && response.data))
    })
    .catch((error: any) => {
      if (error && error.response && error.response.status === 401) {
        dispatch(userTokenError(error))
      } else if (error && error.response && error.response.status === 404) {
        dispatch(getRolesError(`rolesGetAllNotFound: ${error.response.status}`))
      } else {
        dispatch(
          getRolesError(
            `rolesGetAllServiceUnavailable: ${error.response.status}`
          )
        )
      }
    })
}

export const getAppsArray = (userdetails: Array<any>) => (dispatch: any) => {
  dispatch(getAppsRequest())
  getAppsAPI()
    .then((response: any) => {
      dispatch(getAppsSuccess(response && response.data))
      dispatch(
        mapExtraAppToUserdetails(
          userdetails,
          response && response.data && response.data.apps
        )
      )
      dispatch(getRoleArray())
    })
    .catch((error: any) => {
      if (error && error.response && error.response.status === 401) {
        dispatch(userTokenError(error))
      } else if (error && error.response && error.response.status === 404) {
        dispatch(getAppsError(`appsGetAllNotFound: ${error.response.status}`))
      } else {
        dispatch(
          getAppsError(`appsGetAllServiceUnavailable: ${error.response.status}`)
        )
      }
    })
}

export const getUserDetails = (empId: String) => (dispatch: any) => {
  getUserForAllStatusAPI(empId)
    .then((response: any) => {
      dispatch(getUserSuccess(response && response.data))
      dispatch(
        saveAppFuncArray(
          response &&
            response.data &&
            response.data.userdetails &&
            response.data.userdetails[0].appfunc
        )
      )
      dispatch(
        getAppsArray(response && response.data && response.data.userdetails)
      )
      if (response.data.userdetails[0].user.status.toLowerCase() !== 'a') {
        dispatch(setHasAccess(false))
      }
      // dispatch(
      //   getRoleArray(response && response.data && response.data.userdetails)
      // );
    })
    .catch((error: any) => {
      if (error && error.response && error.response.status === 401) {
        dispatch(userTokenError(error))
      } else if (error && error.response && error.response.status === 404) {
        dispatch(getUserError(`usernotadded`))
      } else {
        dispatch(
          getUserError(
            `userdetailsGetServiceUnavailable: ${error.response.status}`
          )
        )
      }
    })
}

export const getUserInfoSuccess = (user: any) => {
  if (user && localStorage) {
    localStorage.setItem('_Colresponse', JSON.stringify(user))
  }
}

export const setHasAccess = (hasAccess: Boolean) => {
  return {
    type: SET_NO_ACCESS,
    payload: hasAccess,
  }
}

export const setMenuList = (value: Array<any>) => {
  return {
    type: SET_MENU_LIST,
    payload: value,
  }
}

export const mapExtraAppToUserdetails =
  (userdetails: Array<any>, appsArray: Array<any>) => (dispatch: any) => {
    for (let i = 0; i < userdetails[0].appmenu.length; i++) {
      const windex = appsArray.findIndex(
        (item) =>
          item.appMenuId === userdetails[0].appmenu[i].appmenuId.toString()
      )
      if (windex > -1) {
        userdetails[0].appmenu[i]['appCode'] = appsArray[windex].appCode
        userdetails[0].appmenu[i]['appName'] = appsArray[windex].appName
        userdetails[0].appmenu[i]['menu1Code'] = appsArray[windex].menu1Code
        userdetails[0].appmenu[i]['menu1Desc'] = appsArray[windex].menu1Desc
        userdetails[0].appmenu[i]['menu2Code'] = appsArray[windex].menu2Code
        userdetails[0].appmenu[i]['menu2Desc'] = appsArray[windex].menu2Desc
      }
      const index = apps.findIndex(
        (item) =>
          item.appMenuId.toString() ===
          userdetails[0].appmenu[i].appmenuId.toString()
      )
      if (index > -1) {
        userdetails[0].appmenu[i]['url'] = apps[index].url
      }
    }
    let uniqueAppCode: Array<any> = []
    for (let i = 0; i < appsArray.length; i++) {
      const name = appsArray[i].appCode
      if (!uniqueAppCode.includes(name)) {
        uniqueAppCode.push(name)
      }
    }
    let menuMap: Array<any> = []
    for (let i = 0; i < uniqueAppCode.length; i++) {
      const value = userdetails[0].appmenu.filter(
        (item: any) => item.appCode === uniqueAppCode[i]
      )
      if (value.length > 0) {
        const submenu = value.filter((item: any) => item.menu1Code !== null)
        menuMap.push({
          appmenuId: value[0].appmenuId,
          appCode: value[0].appCode,
          appName: value[0].appName,
          url: value[0].url,
          more: submenu,
        })
      }
    }
    menuMap.sort((a, b) =>
      a.appmenuId > b.appmenuId ? 1 : b.appmenuId > a.appmenuId ? -1 : 0
    )
    dispatch(getUserSuccess({ userdetails: userdetails }))
    dispatch(setMenuList(menuMap))
  }
