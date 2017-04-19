// @flow
import React from 'react'
import Relay from 'react-relay'
import BillView from './view'

export const billRoute = {
  component: BillView,
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  render: ({ props }: { props: Object }) => {
    if (props) {
      return <BillView {...props} />
    } else {
      return <BillView viewer={null} />
    }
  }
}
