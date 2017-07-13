// @flow
import React, { Component } from 'react'
import { QueryRenderer } from 'react-relay'
import { Route } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom' // eslint-disable-line
import { currentEnvironment } from 'shared/relay'
import { events } from 'shared/events'
import type { RelayRouteConfig } from 'shared/types'

export class RelayRoute extends Component {
  props: {
    path: string,
    exact?: boolean
  } & RelayRouteConfig

  state: { environment: Object } = {
    environment: currentEnvironment()
  }

  // events
  didSetEnvironment = () => {
    this.setState({ environment: currentEnvironment() })
  }

  // lifecycle
  componentWillMount () {
    events.on(events.setEnvironment, this.didSetEnvironment)
  }

  componentWillUnmount () {
    events.off(events.setEnvironment, this.didSetEnvironment)
  }

  render () {
    const { path, exact } = this.props

    return <Route
      path={path}
      exact={exact}
      component={this.container}
    />
  }

  container = (props: ContextRouter) => {
    const { environment } = this.state
    const { query, getInitialVariables, render } = this.props
    const { params } = props.match

    // merge config variables and route variables
    const initialVariables = getInitialVariables && getInitialVariables(props)
    const variables = {
      ...initialVariables,
      ...params
    }

    return <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }: { error: ?Error, props: Object }) => {
        if (error) {
          throw new Error(error) // TODO: show error view
        }

        return render(props)
      }}
    />
  }
}
