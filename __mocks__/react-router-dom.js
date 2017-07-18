import React from 'react'
import { routerProps } from 'mocks/routerProps'

// actual
const {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link
} = require.requireActual('react-router-dom')

// mocks
function withRouter (Component) {
  return (props) => (
    <Component {...routerProps} {...props} />
  )
}

// interface
export {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
}
