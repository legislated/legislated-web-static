// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import { withRouter } from 'react-router'
import { BillScene } from './BillScene'

export const billRoute = {
  component: withRouter(BillScene),
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  render: ({ props }: { props: Object }) => {
    if (props) {
      return <BillScene {...props} />
    } else {
      return <BillScene viewer={null} />
    }
  }
}
