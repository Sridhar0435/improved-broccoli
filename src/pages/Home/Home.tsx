import React, { useEffect, useCallback, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import UserRouter from '../../router/UserRouter'
import Header from '../../sections/Header/Header'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  logoutUser,
  getUser,
  resetRolesArray,
  resetAppsArray,
  resetUserdetails,
  increment,
} from '../../redux/Actions/Login/Action'
import { reset_all } from '../../redux/Actions/PendingAction/Action'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { useStyles, drawerWidth } from './Styles'
import NavigationDrawer from '../../sections/NavigationDrawer/NavigationDrawer'
import { resetErrorFile, resetFile } from '../../redux/Actions/FileUpload'

// const useStyles = makeStyles((theme) => ({
//   contentSection: {
//     marginTop: 64,
//   },
// }));

const Home = (props: any) => {
  const { path } = useRouteMatch()
  const classes = useStyles()
  let history = useHistory()

  const {
    getUser,
    logoutUser,
    isTokenExpired,
    error,
    refreshRoles,
    refreshApps,
    resetUserdetails,
    userDetail,
    reset_all,
    increment,
    incrementD,
    logoutClicked,
    resetFile,
    resetErrorFile,
  } = props
  // let role = userDetail && userDetail.role;
  const [open, setOpen] = useState(false)
  const [openCol, setOpenCol] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const handleDrawerToggle = () => {
    setOpen(!open)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = (url: string) => {
    history.push(url)
    handleDrawerToggle()
  }
  const location = useLocation()

  useEffect(() => {
    const user = JSON.parse(
      (localStorage && localStorage.getItem('_GresponseV2')) || '{}'
    )
    if (user && user.empId && increment === 1) {
      getUser(user.empId)
    }
    if (increment === 0) {
      incrementD()
    }
  }, [getUser, incrementD])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('_Gresponse')
    localStorage.removeItem('_GresponseV2')
    localStorage.removeItem('_Colresponse')
    localStorage.removeItem('_errorCounter')
    sessionStorage.clear()
    refreshRoles()
    refreshApps()
    resetUserdetails()
    reset_all()
    resetFile()
    resetErrorFile()
    logoutUser()
    // history.push('/login')
  }, [
    // history,
    logoutUser,
    refreshRoles,
    refreshApps,
    resetUserdetails,
    reset_all,
  ])

  useEffect(() => {
    logoutClicked && history.push('/login')
  }, [logoutClicked, history])

  useEffect(() => {
    if (isTokenExpired) {
      handleLogout()
    }
  }, [isTokenExpired, handleLogout])

  const serviceError = error

  return (
    <div>
      {/* <Header
        onHandleDrawerOpenClose={handleDrawer}
        onLogout={handleLogout}
        userDetail={userDetail}
      />
      <div className={`flex ${classes.contentSection}`}>
        <div>
          <NavigationDrawer open={open} />
        </div>
        <div className="w-full">
          <ScrollToTop />
          <UserRouter path={path} role={role} serviceError={serviceError} />
        </div>
      </div> */}
      <Header
        toggledraw={handleDrawerToggle}
        open={open}
        drawWidth={drawerWidth}
        onLogout={handleLogout}
      />
      <NavigationDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        handleClick={handleClick}
        openCol={openCol}
        setOpenCol={setOpenCol}
        location={location}
      />
      <div className={classes.height} />
      <div className="paddingaccross"></div>
      {/*<br />*/}
      <ScrollToTop />
      <UserRouter
        open={open}
        handleDrawerToggle={handleClose}
        path={path}
        serviceError={serviceError}
        userDetail={userDetail && userDetail.userdetails}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    refreshRoles: () => dispatch(resetRolesArray()),
    refreshApps: () => dispatch(resetAppsArray()),
    resetUserdetails: () => dispatch(resetUserdetails()),
    getUser: (empId: String) => dispatch(getUser(empId)),
    reset_all: () => dispatch(reset_all()),
    incrementD: () => dispatch(increment()),
    resetFile: () => dispatch(resetFile()),
    resetErrorFile: () => dispatch(resetErrorFile()),
  }
}

const mapStateToProps = (state: any) => {
  return {
    userDetail: state.loginReducer.userDetail,
    logoutClicked: state.loginReducer.logoutClicked,
    isTokenExpired: state.loginReducer.isTokenExpired,
    error: state.loginReducer.error,
    increment: state.loginReducer.value,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
