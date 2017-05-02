// @flow
import React from 'react'
import Relay from 'react-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import { NotFoundView } from './not_found_view'
import { Container } from './container'
import { aboutRoute, searchRoute, billRoute, faqRoute } from '../scenes'

export const AppRouter = () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route component={Container}>
      <Route path='/' {...searchRoute} />
      <Route path='about' {...aboutRoute} />
      <Route path='faq' {...faqRoute} />
      <Route path='bill/:id' {...billRoute} />
      <Route path='*' component={NotFoundView} />
    </Route>
  </Router>
)
