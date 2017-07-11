// @flow
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RelayRoute } from './RelayRoute'
import { Container, NotFoundView } from './components'
import { searchRoute, billRoute, aboutRoute, faqRoute } from '../scenes'

export class Router extends Component {
  render () {
    return <BrowserRouter>{routes()}</BrowserRouter>
  }
}

export const routes = () => (
  <Container>
    <Switch>
      <RelayRoute path='/' {...searchRoute} />
      <Route path='about' {...aboutRoute} />
      <Route path='faq' {...faqRoute} />
      <RelayRoute path='bill/:id' {...billRoute} />
      <Route path='*' component={NotFoundView} />
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
//     local.set('@@legislated/intro-visited', 'true')
//   }
// }
