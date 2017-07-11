// @flow
import React from 'react'
import { graphql } from 'react-relay'
import { BillScene } from './BillScene'
import type { RelayRouteDestination } from 'shared/types'

export const billRoute: RelayRouteDestination<*, *, *> = {
  component: BillScene,
  query: graphql`
    query billQuery($billId: ID!) {
      viewer {
        bill(id: $billId) {
          ...BillScene_bill
        }
      }
    }
  `,
  render (props) {
    if (props) {
      return <BillScene {...props} />
    } else {
      return <BillScene bill={null} />
    }
  }
}
