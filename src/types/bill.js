// @flow
import type { Hearing } from './hearing'

export type Bill = {
  id: string,
  documentNumber: string,
  title: string,
  hearing: Hearing
}
