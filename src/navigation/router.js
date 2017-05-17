// @flow
import React, { Component } from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import useScroll from 'react-router-scroll/lib/useScroll'
import { Routes } from './routes'
import { buildEnvironment } from '../relay'
import { events } from 'shared/events'

export class AppRouter extends Component {
  routes: React$Element<*>

  state: { environment: Object } = {
    environment: buildEnvironment()
  }

  constructor () {
    super()
    this.routes = Routes()
  }

  // events
  didUpdateEnvironment = (header: string) => {
    const environment = buildEnvironment({ 'Authorization': header })
    this.setState({ environment })
  }

  // lifecycle
  componentWillMount () {
    events.on(events.setAuthHeader, this.didUpdateEnvironment)
  }

  componentWillUnmount () {
    events.off(events.setAuthHeader, this.didUpdateEnvironment)
  }

  render () {
    const { environment } = this.state
    const middleware = applyRouterMiddleware(useRelay, useScroll())

    return <Router history={browserHistory} render={middleware} environment={environment}>
      {this.routes}
    </Router>
  }
}
