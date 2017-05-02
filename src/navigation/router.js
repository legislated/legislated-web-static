// @flow
import React from 'react'
import Relay from 'react-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import { NotFoundView } from './not_found_view'
import { Container } from './container'
import { aboutRoute, searchRoute, billRoute, faqRoute } from '../scenes'
import { set } from 'shared/storage'

let hasEnteredSearch = false

function onChange (route: { location: { pathname: string } }) {
  const { pathname } = route.location

  if (!hasEnteredSearch && pathname === '/') {
    hasEnteredSearch = true
  }

  if (hasEnteredSearch && pathname !== '/') {
    set('visited-intro', 'true')
  }
}

export const AppRouter = () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route component={Container} onChange={onChange}>
      <Route path='/' {...searchRoute} />
      <Route path='about' {...aboutRoute} />
      <Route path='faq' {...faqRoute} />
      <Route path='bill/:id' {...billRoute} />
      <Route path='*' component={NotFoundView} />
    </Route>
  </Router>
)
