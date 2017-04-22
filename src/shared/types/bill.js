// @flow
import type { Hearing } from './hearing'
import type { Committee } from './committee'
import type { Chamber } from './chamber'

// type
export type Bill = {
  id: string,
  documentNumber: string,
  title: string,
  summary: string,
  detailsUrl: string,
  fullTextUrl: string,
  witnessSlipUrl: string,
  hearing: Hearing,
  committee: Committee,
  chamber: Chamber
}
