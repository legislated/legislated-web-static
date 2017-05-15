// @flow
import type { Connection } from './connection'
import type { Bill } from './bill'

export type Viewer = {
  isAdmin: boolean,
  bill: Bill,
  bills: Connection<Bill>
}
