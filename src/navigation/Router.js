// @flow
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RelayRoute } from './RelayRoute'
import { Container, NotFoundView } from './components'
import * as scenes from '../scenes'

export class Router extends Component {
  render () {
    return <BrowserRouter>{routes()}</BrowserRouter>
  }
}

export const routes = () => (
  <Container>
    <Switch>
      <RelayRoute path='/' exact {...scenes.search} />
      <Route path='/about' {...scenes.about} />
      <Route path='/faq' {...scenes.faq} />
      <RelayRoute path='/bill/:id' {...scenes.bill} />
      <Route component={NotFoundView} />
    </Switch>
  </Container>
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
