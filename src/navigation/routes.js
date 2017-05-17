// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { NotFoundView } from './not_found_view'
import { Container } from './container'
import { local } from 'shared/storage'
import { searchRoute, billRoute, aboutRoute, faqRoute, adminRoute, adminBillsRoute } from '../scenes'

let hasEnteredSearch = false

export function reset () {
  hasEnteredSearch = false
}

function didChangeRoute (route: { location: { pathname: string } }) {
  const { pathname } = route.location

  if (!hasEnteredSearch && pathname === '/') {
    hasEnteredSearch = true
  }

  if (hasEnteredSearch && pathname !== '/') {
    local.set('@@legislated/intro-visited', 'true')
  }
}

export const Routes = () => (
  <Route component={Container} onChange={didChangeRoute}>
    <Route path='/' {...searchRoute} />
    <Route path='about' {...aboutRoute} />
    <Route path='faq' {...faqRoute} />
    <Route path='bill/:id' {...billRoute} />
    <Route path='admin' {...adminRoute}>
      <IndexRoute {...adminBillsRoute} />
    </Route>
    <Route path='*' component={NotFoundView} />
  </Route>
)
