import React from 'react'
import ReactDOM from 'react-dom'
import './styles/essential.css'
import './styles/hbtw.css'
import './styles/global/helpers.css'
import App from './pages/App'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
