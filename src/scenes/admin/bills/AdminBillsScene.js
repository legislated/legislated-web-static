// @flow
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay/classic'
import type { Viewer, RelayProp } from 'shared/types'
import { auth } from 'shared/auth'

type AdminBillsProps = {
  viewer: ?Viewer,
  relay: RelayProp
}

let AdminBillsScene = class AdminBillsScene extends Component {
  props: AdminBillsProps

  static contextTypes = {
    router: PropTypes.object
  }

  // lifecycle
  componentWillReceiveProps (nextProps: AdminBillsProps) {
    const { viewer } = nextProps

    if (viewer && !viewer.isAdmin) {
      auth.signOut()
      this.context.router.replace('/admin')
    }
  }

  render () {
    return <div>Hello Admin Bills</div>
  }
}

AdminBillsScene = Relay.createContainer(AdminBillsScene, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        isAdmin
        bills(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  }
})

export { AdminBillsScene }
