import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AccessDenied from '../pages/AccessDenied/AccessDenied'
import SiteMaintenance from '../pages/SiteMaintenance/SiteMaintenance'

const AuthRoute = ({
  path,
  component: Component,
  isAuthorized: isAuth,
  serviceError: error,
  arb,
  ...rest
}: {
  path: string
  component: React.FunctionComponent<JSX.Element>
  isAuthorized?: boolean
  serviceError?: boolean
  arb?: boolean
}) => {
  const authResponse = JSON.parse(localStorage.getItem('_Gresponse') || '{}')
  const idToken =
    authResponse && authResponse.tokenObj && authResponse.tokenObj.id_token

  if (idToken && isAuth) {
    return <Route component={Component} {...rest} path={path} />
  } else if (idToken && error && !arb) {
    return <Route component={SiteMaintenance} path={path} {...rest} />
  } else if (idToken && !isAuth && !arb) {
    return <Route component={AccessDenied} path={path} {...rest} />
  } else if (arb) {
    return <Route component={Component} path={path} {...rest} />
  } else {
    return <Redirect to="/login" />
  }
}

export default AuthRoute
