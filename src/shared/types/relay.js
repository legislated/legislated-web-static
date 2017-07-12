// @flow
export type RelayRouteDestination<P, C: Class<React$Component<*, P, *>>, V> = {
  component: C,
  query: mixed,
  render: ?P => ?React$Element<*>,
  initialVariables?: V
}
