// @flow
import React from 'react'
import Relay from 'react-relay/compat'
import { withRouter } from 'react-router-dom'
import { AdminBillsScene } from './AdminBillsScene'

export const adminBillsRoute = {
  component: AdminBillsScene,
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  render ({ props }: { props: Object }) {
    if (props) {
      return <AdminBillsScene {...props} />
    } else {
      return <AdminBillsScene viewer={null} />
    }
  }
}
