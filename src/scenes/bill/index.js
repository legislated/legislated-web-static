// @flow
import React from 'react'
import Relay from 'react-relay'
import { BillScene } from './scene'

export const billRoute = {
  component: BillScene,
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
