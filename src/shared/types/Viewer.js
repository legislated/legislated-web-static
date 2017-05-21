// @flow
import type { SearchConnection } from './Connection'
import type { Bill } from './Bill'

export type Viewer = {
  isAdmin: boolean,
  bill: Bill,
  bills: SearchConnection<Bill>
}
