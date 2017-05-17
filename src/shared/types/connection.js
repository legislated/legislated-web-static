// @flow
import type { Edge } from './Edge'
import type { PageInfo } from './PageInfo'

// types
export type Connection<T> = {
  edges: Array<Edge<T>>,
  pageInfo: PageInfo
}

export type SearchConnection<T> = {
  count: number
} & Connection<T>

// functions
export function unwrap<T> (connection: ?Connection<T>): Array<T> {
  return connection ? connection.edges.map((edge) => edge.node) : []
}
