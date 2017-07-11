// @flow
export type RelayQueryConfig<V> = {
  query: mixed,
  variables: V
}

export type RelayRouteDestination<P, C: Class<React$Component<*, P, *>>, V> = {
  component: C,
  query: mixed,
  render: ?P => ?React$Element<*>,
  variables?: V
}
