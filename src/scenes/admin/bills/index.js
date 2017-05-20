// @flow
import React from 'react'
import Relay from 'react-relay'
import { withRouter } from 'react-router'
import { AdminBillsScene } from './AdminBillsScene'

export const adminBillsRoute = {
  component: withRouter(AdminBillsScene),
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
