// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import BillCell from './components/bill_cell'
import colors from '../colors'
import type { Viewer } from '../../types'
import { nodes } from '../../types/connection'

class BillsView extends Component {
  props: {
    viewer: Viewer
  }

  render () {
    const bills = nodes(this.props.viewer.bills)

    return <div className={css(styles.container)}>
      <div className={css(styles.header)}>Bills</div>
      {bills.map((bill) => {
        return <BillCell key={bill.id} bill={bill} />
      })}
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightestGray
  },
  header: {
    marginBottom: 30,
    padding: '0 15px',
    fontSize: 24
  }
})

export default Relay.createContainer(BillsView, {
  initialVariables: {
    startDate: '',
    endDate: ''
  },
  prepareVariables: (previousVariables: { [name: string]: mixed }) => {
    return {
      startDate: moment().startOf('day'),
      endDate: moment().add(6, 'days').endOf('day')
    }
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        bills(first: 100, from: $startDate, to: $endDate) {
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
