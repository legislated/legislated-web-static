// @flow
import type { Edge } from './edge'
import type { PageInfo } from './page_info'

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
