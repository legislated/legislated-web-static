// @flow
import type { Edge } from './edge'

// type
export type Connection<T> = {
  edges: Array<Edge<T>>,
}

// functions
export function nodes<T> (connection: ?Connection<T>): Array<T> {
  return connection ? connection.edges.map(edge => edge.node) : []
}
