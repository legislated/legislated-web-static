// @flow
import type { Edge } from './edge'
import type { PageInfo } from './page_info'

// types
export type Connection<T> = {
  edges: Array<Edge<T>>,
  pageInfo?: PageInfo;
}

export type UnwrappedConnection<T> = {
  nodes: Array<T>,
  pageInfo?: PageInfo
}

// functions
export function unwrap<T> (connection: ?Connection<T>): UnwrappedConnection<T> {
  if (!connection) {
    return { nodes: [] }
  }

  const { edges, pageInfo } = connection
  return {
    pageInfo,
    nodes: edges.map((edge) => edge.node)
  }
}
