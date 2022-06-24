import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Login from '../pages/Login/Login'
import AuthRoute from './AuthRoute'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import { routes } from '../util/Constants'
import PromptDialog from '../components/PromptDialog/PromptDialog'

const Error = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      color: '#004e37',
    }}
  >
    <p style={{ fontSize: '24px', marginTop: 10 }}>Error Page</p>
  </div>
)

const AppRouter = () => {
  const [confirm, setConfirm] = React.useState(false)
  const [confirmCallback, setConfirmCallback] = React.useState(null)
  const { DEFAULT } = routes
  function getConfirmation(message: any, callback: any) {
    setConfirmCallback(() => callback)
    setConfirm(true)
  }
  return (
    <Container>
      <BrowserRouter getUserConfirmation={getConfirmation}>
        <Switch>
          <AuthRoute
            path={`${DEFAULT}`}
            component={Home}
            isAuthorized={true}
            arb={false}
          />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route exact path="/error" component={Error} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
        <PromptDialog
          cancelOpen={confirm}
          confirmCallback={confirmCallback}
          handleCancel={setConfirm}
          label1="Sure to leave the page?"
          label2="Unsaved changes will be lost"
        />
      </BrowserRouter>
    </Container>
  )
}

export default AppRouter
