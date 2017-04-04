// @flow
type Variables = {[key: string]: any}

export type RelayProp = {
  variables: Variables,
  pendingVariables: ?Variables,
  setVariables (partialVariables: Object, onReadyStateChange?: Function): void,
  forceFetch (partialVariables: Object, onReadyStateChange?: Function): void
}
