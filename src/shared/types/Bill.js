// @flow
import type { Hearing } from './Hearing'
import type { Committee } from './Committee'
import type { Chamber } from './Chamber'

// type
export type Bill = {
  id: string,
  documentNumber: string,
  title: string,
  summary: string,
  detailsUrl: string,
  fullTextUrl: string,
  witnessSlipUrl: string,
  witnessSlipResultUrl: string,
  hearing: Hearing,
  committee: Committee,
  chamber: Chamber
}
