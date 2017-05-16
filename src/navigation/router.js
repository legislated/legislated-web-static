// @flow
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import useScroll from 'react-router-scroll/lib/useScroll'
import { NotFoundView } from './not_found_view'
import { Container } from './container'
import { environment } from '../relay'
import { local } from 'shared/storage'
import { searchRoute, billRoute, aboutRoute, faqRoute, adminRoute, adminBillsRoute } from '../scenes'

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

export class AppRouter extends Component {
  state: { environment: ?Object } = {
    environment: null
  }

  // events
  didUpdateEnvironment = (environment: Object) => {
    this.setState({ environment })
  }

  // lifecycle
  componentWillMount () {
    environment.on(this.didUpdateEnvironment)
    environment.recreate()
  }

  componentWillUnmount () {
    environment.off()
  }

  render () {
    const { environment } = this.state
    const middleware = applyRouterMiddleware(useRelay, useScroll())

    return <Router history={browserHistory} render={middleware} environment={environment}>
      <Route component={Container} onChange={onChange}>
        <Route path='/' {...searchRoute} />
        <Route path='about' {...aboutRoute} />
        <Route path='faq' {...faqRoute} />
        <Route path='bill/:id' {...billRoute} />
        <Route path='admin' {...adminRoute}>
          <IndexRoute {...adminBillsRoute} />
        </Route>
        <Route path='*' component={NotFoundView} />
      </Route>
    </Router>
  }
}
