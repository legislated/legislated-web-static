// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { throttle } from 'lodash'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import BillCell from './components/bill_cell'
import SearchField from './components/search_field'
import { colors } from '../styles'
import type { Viewer, RelayProp } from '../../types'
import { nodes } from '../../types/connection'

class BillsView extends Component {
  props: {
    viewer: Viewer,
    relay: RelayProp
  }

  state = {
    query: ''
  }

  // events
  searchFieldDidChange = (query) => {
    this.setState({ query })
    this.fetchBillsForQuery(query)
  }

  fetchBillsForQuery = throttle((query) => {
    this.props.relay.setVariables({ query })
  }, 300)

  // lifecycle
  render () {
    const { query } = this.state
    const bills = nodes(this.props.viewer.bills)

    return <div className={css(styles.container)}>
      <SearchField style={styles.searchField} value={query} onChange={this.searchFieldDidChange} />
      {bills.map((bill) => {
        return <BillCell key={bill.id} bill={bill} />
      })}
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: colors.lightGray
  },
  searchField: {
    marginBottom: 30
  }
})

export default Relay.createContainer(BillsView, {
  initialVariables: {
    query: '',
    startDate: '',
    endDate: ''
  },
  prepareVariables: (previousVariables) => {
    return {
      query: previousVariables.query,
      startDate: moment().startOf('day'),
      endDate: moment().add(6, 'days').endOf('day')
    }
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        bills(first: 100, from: $startDate, to: $endDate, query: $query) {
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
