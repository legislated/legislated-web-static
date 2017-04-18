// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import type { Viewer } from '../../types'

class BillView extends Component {
  props: {
    viewer: ?Viewer
  }

  render () {
    const { viewer } = this.props
    if (!viewer) {
      return <div>Loading...</div>
    }

    return <div>Hello, bill {viewer.bill.id}</div>
  }
}

export default Relay.createContainer(BillView, {
  initialVariables: {
    id: ''
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        bill(id: $id) {
          id
        }
      }
    `
  }
})
