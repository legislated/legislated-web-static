// @flow
import React from 'react'
import Relay from 'react-relay'
import BillsView from './view'

export const billsRoute = {
  component: BillsView,
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  render: ({ props }: { props: Object }) => {
    if (props) {
      return <BillsView {...props} />
    } else {
      return <BillsView viewer={null} />
    }
  }
}
