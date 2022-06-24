import {
  AppBar,
  Grid,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { Logo } from '../../Logos'
import { loginUser } from '../../redux/Actions/Login'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { useCallback } from 'react'
import Config from '../../config/Config'
import { useStyles } from './Styles'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { ServiceResponse } from './Messages'
import { routes } from '../../util/Constants'

function Login(props: any) {
  const { loginUser, user, isLoading, errorMessage } = props
  const { DEFAULT, DASHBOARD } = routes
  const theme = useTheme()
  const active = useMediaQuery(theme.breakpoints.down(500))
  const moresmall = useMediaQuery(theme.breakpoints.down(320))
  const classes = useStyles()
  let history = useHistory()
  const { GOOGLE_CLIENT_ID } = Config
  const responseGoogle = useCallback(
    (response: any) => {
      console.log('starting response')
      if ('tokenId' in response) {
        if (response && response.tokenId) {
          localStorage.setItem('_Gresponse', JSON.stringify(response))
          const idToken =
            response && response.tokenObj && response.tokenObj.id_token
          console.log(idToken)
          loginUser(idToken)
        }
      }
    },
    [loginUser]
  )
  // useEffect(() => {
  //   console.log("before enter")
  //   if(localStorage.getItem('_Gresponse') && localStorage.getItem('_GresponseV2')) {
  //    console.log("enter")
  //     history.push('/Commercial/dashboard')
  //   }
  //   else if (localStorage.getItem('_Gresponse')) {
  //     responseGoogle(localStorage.getItem('_Gresponse'))
  //   }
  // }, [responseGoogle, history])

  useEffect(() => {
    // console.log("before enter")
    if (
      localStorage.getItem('_Gresponse') &&
      localStorage.getItem('_GresponseV2')
    ) {
      history.push(`${DEFAULT}${DASHBOARD}`)
    }
    // else if (localStorage.getItem('_Gresponse')) {
    //   responseGoogle(localStorage.getItem('_Gresponse'))
    // }
  }, [DASHBOARD, DEFAULT, history])

  useEffect(() => {
    if (user) {
      if (!isLoading && errorMessage.toLowerCase() !== 'usernotadded')
        history.push(`${DEFAULT}${DASHBOARD}`)
      else history.push('/login')
    }
  }, [user, history, errorMessage, isLoading, DEFAULT, DASHBOARD])

  const responseGoogleerror = (error: any) => {
    console.log(error)
    history.push('/login')
  }
  // useEffect(() => {
  //   if (errorMessage) {
  //     let errorCode = ServiceResponse.getMessage("login", "serviceUnavailable");
  //     history.push("/login");
  //     console.log(errorMessage);
  //     console.log(errorCode);
  //     // alert("Invalid user");
  //     if (errorMessage === errorCode) {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "Error",
  //         detail: "Login failed. Service is not available.",
  //         life: 6000,
  //         className: "login-toast",
  //       });
  //     } else {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "Error",
  //         detail: "Login failed. Employee does not exist.",
  //         life: 6000,
  //         className: "login-toast",
  //       });
  //     }
  //   }
  // }, [errorMessage, history]);

  // useEffect(() => {
  //   if (error) {
  //     let Errorcode;
  //     if (localStorage && localStorage.getItem("errorCode")) {
  //       Errorcode = localStorage && localStorage.getItem("_GresponseV2");
  //     }
  //     if (Errorcode === "500") {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "",
  //         detail: "Service Unavailable",
  //         life: 6000,
  //       });
  //     }
  //     if (
  //       Errorcode === "400" ||
  //       Errorcode === "404" ||
  //       Errorcode === "403" ||
  //       Errorcode === "401"
  //     ) {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "",
  //         detail: "Login failed. Employee does not exist.",
  //         life: 6000,
  //       });
  //     }
  //   }
  // }, [error]);

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <AppBar
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Toolbar
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: !active ? '40vh' : '20vh',
            }}
          >
            <Grid container className={classes.gridContainer}>
              <Grid item className={classes.logo} xs={4} xl={4} md={4} lg={4}>
                <Logo height={500} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div
          className={classes.height}
          style={{ height: !active ? '30vh' : '10vh' }}
        />
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10,
            height: !moresmall ? '50vh' : '40vh',
          }}
        >
          <div
            className={!moresmall ? 'display6' : 'display7'}
            style={{ color: '#004e37' }}
          >
            Commercial Web Application
          </div>
          <br />
          {/* <div className="subtitle2" style={{ color: '#004e37' }}>
            Sign in with Google
          </div> */}
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Signin with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogleerror}
            cookiePolicy={'single_host_origin'}
            style={{ flex: 1 }}
            autoLoad={false}
          />
        </div>
        <div
          className={classes.error}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10,
          }}
        >
          {errorMessage.toLowerCase() !== 'usernotadded'
            ? errorMessage
            : ServiceResponse.getMessage('app', 'usernotadded')}
        </div>
        <LoadingComponent showLoader={isLoading} />
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state.loginReducer.user,
    error: state.loginReducer.error,
    errorMessage: state.loginReducer.errorMessage,
    isLoading: state.loginReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (idToken: any) => dispatch(loginUser(idToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
