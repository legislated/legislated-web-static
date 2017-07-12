// @flow
type Props = Object

export type RouteConfig = {
  component: Class<React$Component<*, *, *>>
}

export type RelayRouteConfig = {
  query: mixed,
  render: Props => ?React$Element<*>,
  initialVariables?: Object
}
