// @flow
export type RelayProp = {
  variables: {[key: string]: number},
  setVariables (partialVariables: Object, onReadyStateChange?: Function): void,
  forceFetch (partialVariables: Object, onReadyStateChange?: Function): void
}
