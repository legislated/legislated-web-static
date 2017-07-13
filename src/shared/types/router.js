// @flow
import type { ContextRouter } from 'react-router-dom'

type Props = Object

export type RouteConfig = {
  component: Class<React$Component<*, *, *>>
}

export type RelayRouteConfig = {
  query: mixed,
  render: Props => ?React$Element<*>,
  getInitialVariables?: (ContextRouter) => Object
}
