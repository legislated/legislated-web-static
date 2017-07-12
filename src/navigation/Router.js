// @flow
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import type { ContextRouter, Match } from 'react-router-dom' // eslint-disable-line
import { RelayRoute } from './RelayRoute'
import { Container, NotFoundView } from './components'
import * as scenes from '../scenes'
import { auth } from 'shared/auth'

export class Router extends Component {
  render () {
    return <BrowserRouter>
      <Routes />
    </BrowserRouter>
  }
}

// root routes
const Routes = () => (
  <Container>
    <Switch>
      <RelayRoute path='/' exact {...scenes.search} />
      <Route path='/about' {...scenes.about} />
      <Route path='/faq' {...scenes.faq} />
      <RelayRoute path='/bill/:id' {...scenes.bill} />
      <Route path='/admin' component={AdminFilter} />
      <Route component={NotFoundView} />
    </Switch>
  </Container>
)

// admin routes
const AdminFilter = (props: ContextRouter) => {
  const didMatchSignIn = props.location.pathname === '/admin/sign-in'

  if (!auth.isSignedIn && !didMatchSignIn) {
    return <Redirect to='/admin/sign-in' />
  } else if (auth.isSignedIn && didMatchSignIn) {
    return <Redirect to='/admin/bills' />
  } else {
    return <AdminRoutes {...props} />
  }
}

const AdminRoutes = (props: ContextRouter) => (
  <Switch>
    <Route path='/admin/sign-in' {...scenes.adminAuth} />
    {/* <RelayRoute path='/admin/bills' {...scenes.adminBills} /> */}
    <Redirect to='/admin/sign-in' />
  </Switch>
)

// import { local } from 'shared/storage'
//
// let hasEnteredSearch = false
//
// export function reset () {
//   hasEnteredSearch = false
// }
//
// function didChangeRoute (route: { location: { pathname: string } }) {
//   const { pathname } = route.location
//
//   if (!hasEnteredSearch && pathname === '/') {
//     hasEnteredSearch = true
//   }
//
//   if (hasEnteredSearch && pathname !== '/') {
//     local.set('intro-visited', 'true')
//   }
// }
