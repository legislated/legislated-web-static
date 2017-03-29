// @flow
export type RelayProp = {
  setVariables (partialVariables: Object, onReadyStateChange?: Function): void,
  forceFetch (partialVariables: Object, onReadyStateChange?: Function): void
}
