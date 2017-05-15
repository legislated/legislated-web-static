// @flow
import React from 'react'
import Relay from 'react-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import useScroll from 'react-router-scroll/lib/useScroll'
import { NotFoundView } from './not_found_view'
import { Container } from './container'
import { searchRoute, billRoute, aboutRoute, faqRoute, adminBillsRoute } from '../scenes'
import { local } from 'shared/storage'

let hasEnteredSearch = false

export function reset () {
  hasEnteredSearch = false
}

function onChange (route: { location: { pathname: string } }) {
  const { pathname } = route.location

  if (!hasEnteredSearch && pathname === '/') {
    hasEnteredSearch = true
  }

  if (hasEnteredSearch && pathname !== '/') {
    local.set('@@legislated/intro-visited', 'true')
  }
}

export function AppRouter () {
  const middleware = applyRouterMiddleware(useRelay, useScroll())

  return <Router history={browserHistory} render={middleware} environment={Relay.Store}>
    <Route component={Container} onChange={onChange}>
      <Route path='/' {...searchRoute} />
      <Route path='about' {...aboutRoute} />
      <Route path='faq' {...faqRoute} />
      <Route path='bill/:id' {...billRoute} />
      <Route path='admin' {...adminBillsRoute} />
      <Route path='*' component={NotFoundView} />
    </Route>
  </Router>
}
