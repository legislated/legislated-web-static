// @flow
import React from 'react'
import Relay from 'react-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import { BillsView, BillsQueries } from '../bills'
import NotFoundView from './not_found_view'

export const AppRouter = () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route path='/' component={BillsView} queries={BillsQueries} />
    <Route path='*' component={NotFoundView} />
  </Router>
)
