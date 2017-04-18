// @flow
import type { Connection } from './connection'
import type { Bill } from './bill'

export type Viewer = {
  bill: Bill,
  bills: Connection<Bill>
}
