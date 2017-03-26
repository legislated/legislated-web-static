// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import type { Viewer } from '../../types'
import { nodes } from '../../functions'

class BillsView extends Component {
  props: {
    viewer: Viewer
  }

  render () {
    const bills = nodes(this.props.viewer.bills)
    return <div>
      <div>Bills</div>
      {bills.map((bill) => {
        return <div key={bill.id}>{bill.id}</div>
      })}
    </div>
  }
}

export default Relay.createContainer(BillsView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        bills(first: 100) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  }
})
