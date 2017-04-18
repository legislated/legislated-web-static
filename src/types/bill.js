// @flow
import type { Hearing } from './hearing'

// type
export type Bill = {
  id: string,
  documentNumber: string,
  title: string,
  summary: string,
  detailsUrl: string,
  fullTextUrl: string,
  witnessSlipUrl: string,
  hearing: Hearing
}
