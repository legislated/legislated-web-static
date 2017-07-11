// @flow
import React, { Component } from 'react'
import { QueryRenderer } from 'react-relay'
import { Route } from 'react-router-dom'
import { currentEnvironment } from '../relay'
import { events } from 'shared/events'
import type { RelayRouteDestination } from 'shared/types'

type RelayRouteProps<P, C: Class<Component<*, P, *>>> = {
  path: string,
} & RelayRouteDestination<P, C, *>

export class RelayRoute<P, C: Class<Component<*, P, *>>> extends Component<*, *, *> {
  props: RelayRouteProps<P, C>

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
    return <Route path={this.props.path} component={this.container} />
  }

  container = (props: Object) => {
    const { environment } = this.state
    const { query, variables, render } = this.props

    return <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }: { error: Error, props: ?P }) => {
        if (error) {
          throw new Error(error) // TODO: show error view
        }

        return render(props)
      }}
    />
  }
}
