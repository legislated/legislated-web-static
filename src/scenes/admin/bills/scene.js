// @flow
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { events } from 'shared/events'
import { session } from 'shared/storage'
import type { Viewer, RelayProp } from 'shared/types'

type AdminBillsProps = {
  viewer: ?Viewer,
  relay: RelayProp
}

class AdminBillsView extends Component {
  props: AdminBillsProps

  static contextTypes = {
    router: PropTypes.object
  }

  // lifecycle
  componentWillReceiveProps (nextProps: AdminBillsProps) {
    const { viewer } = nextProps

    if (viewer && !viewer.isAdmin) {
      this.context.router.replace('/admin')
      session.set('@@legislated/admin-header', null)
      events.emit(events.setAuthHeader, null)
    }
  }

  render () {
    return <div>Hello Admin Bills</div>
  }
}

export const AdminBillsScene = Relay.createContainer(AdminBillsView, {
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
