// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { throttle } from 'lodash'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import SearchField from './components/search_field'
import BillCell from './components/bill_cell'
import LoadMoreButton from './components/load_more_button'
import type { Viewer, RelayProp } from '../../types'
import { unwrap } from '../../types/connection'

const pageSize = 25

class BillsView extends Component {
  props: {
    viewer: Viewer,
    relay: RelayProp
  }

  state = {
    query: ''
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    relay.setVariables({ first: relay.variables.first + pageSize })
  }

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
    const bills = unwrap(this.props.viewer.bills)
    const hasNextPage = bills.pageInfo && bills.pageInfo.hasNextPage

    return <div className={css(styles.container)}>
      <SearchField style={styles.searchField} value={query} onChange={this.searchFieldDidChange} />
      {bills.nodes.map((bill, i) => {
        return <BillCell key={bill.id} bill={bill} isLast={i === bills.nodes.length - 1} />
      })}
      <LoadMoreButton style={styles.loadMoreButton} hasMore={hasNextPage} onClick={this.didClickLoadMore} />
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  searchField: {
    marginBottom: 30
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 30
  }
})

export default Relay.createContainer(BillsView, {
  initialVariables: {
    first: pageSize,
    query: '',
    startDate: '',
    endDate: ''
  },
  prepareVariables: (previousVariables) => {
    return {
      first: previousVariables.first,
      query: previousVariables.query,
      startDate: moment().startOf('day'),
      endDate: moment().add(6, 'days').endOf('day')
    }
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        bills(first: $first, from: $startDate, to: $endDate, query: $query) {
          edges {
            node {
              id
              ${BillCell.getFragment('bill')}
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `
  }
})
