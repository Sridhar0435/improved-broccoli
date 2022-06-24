export const userInfo = {
  getLoggedInUserName: () => {
    if (localStorage && localStorage.getItem('_Gresponse')) {
      const userInfo = JSON.parse(
        localStorage && localStorage.getItem('_Gresponse')
      )
      const firstName =
        userInfo && userInfo.profileObj && userInfo.profileObj.givenName
          ? userInfo.profileObj.givenName
          : ''
      const lastName =
        userInfo && userInfo.profileObj && userInfo.profileObj.familyName
          ? userInfo.profileObj.familyName
          : ''
      return firstName + ' ' + lastName
    } else {
      return ''
    }
  },
  getLoggedInEmpId: () => {
    if (localStorage && localStorage.getItem('_Colresponse')) {
      const colinfo = JSON.parse(
        localStorage && localStorage.getItem('_Colresponse')
      )
      return colinfo && colinfo.employeeId
    } else {
      return ''
    }
  },
  getLoggedInAvtarName: () => {
    if (localStorage && localStorage.getItem('_Gresponse')) {
      const userInfo = JSON.parse(
        localStorage && localStorage.getItem('_Gresponse')
      )
      const firstName =
        userInfo && userInfo.profileObj && userInfo.profileObj.givenName
          ? userInfo.profileObj.givenName.charAt(0)
          : ''
      const lastName =
        userInfo && userInfo.profileObj && userInfo.profileObj.familyName
          ? userInfo.profileObj.familyName.charAt(0)
          : ''
      return firstName + '' + lastName
    } else {
      return ''
    }
  },
}
