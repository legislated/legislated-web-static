// @flow
export type Edge<T> = {
  node: T
}

export type Connection<T> = {
  edges: Array<Edge<T>>,
}
