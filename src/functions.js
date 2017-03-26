import { Connection } from './types'

export function nodes<T> (connection: ?Connection<T>): Array<T> {
  return connection ? connection.edges.map(edge => edge.node) : []
}
