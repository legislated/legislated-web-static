// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import BillCell from './components/bill_cell'
import fonts from '../fonts'
import type { Viewer } from '../../types'
import { nodes } from '../../functions'

class BillsView extends Component {
  props: {
    viewer: Viewer
  }

  render () {
    const bills = nodes(this.props.viewer.bills)
    return <div>
      <div className={css(styles.header)}>Bills</div>
      {bills.map((bill) => {
        return <BillCell key={bill.id} bill={bill} />
      })}
    </div>
  }
}

const styles = StyleSheet.create({
  header: {
    ...fonts.regular
  }
})

export default Relay.createContainer(BillsView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        bills(first: 100) {
          edges {
            node {
              id
              ${BillCell.getFragment('bill')}
            }
          }
        }
      }
    `
  }
})
