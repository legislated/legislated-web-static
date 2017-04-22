// @flow
import React from 'react'
import Relay from 'react-relay'
import { BillsScene } from './scene'

export const billsRoute = {
  component: BillsScene,
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  render: ({ props }: { props: Object }) => {
    if (props) {
      return <BillsScene {...props} />
    } else {
      return <BillsScene viewer={null} />
    }
  }
}
