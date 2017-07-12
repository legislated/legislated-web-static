// @flow
import React, { Component } from 'react'
import { createPaginationContainer, graphql } from 'react-relay/compat'
import type { RelayPaginationProp } from 'react-relay'
import type moment from 'moment'
import { BillCell } from './BillCell'
import { BillAnimation, billRule } from './BillAnimation'
import { LoadMoreButton } from './LoadMoreButton'
import { initialVariables } from '../searchRoute'
import { stylesheet, mobile } from 'shared/styles'
import { unwrap } from 'shared/types/Connection'
import type { Viewer } from 'shared/types' // eslint-disable-line

function format (date: moment): string {
  return date.format('MMM Do')
}

let BillsList = class BillsList extends Component {
  props: {
    viewer: Viewer,
    animated: Boolean,
    relay: RelayPaginationProp
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(initialVariables.count, (error: ?Error) => {
      if (error) {
        console.error(`error loading next page: ${error.toString()}`)
      }
    })
  }

  // lifecycle
  render () {
    const { relay, viewer, animated } = this.props
    const { bills } = viewer
    const { count } = bills
    const { startDate, endDate } = initialVariables

    return <div {...rules.container}>
      <div {...rules.header}>
        <h2>Upcoming Bills</h2>
        <div>{`${format(startDate)} to ${format(endDate)}`}</div>
        <div>{`Found ${count} result${count === 1 ? '' : 's'}.`}</div>
      </div>
      <BillAnimation disable={!animated}>
        {this.renderBills(unwrap(bills))}
      </BillAnimation>
      <LoadMoreButton
        styles={rules.loadMoreButton}
        hasMore={relay.hasMore()}
        onClick={this.didClickLoadMore}
      />
    </div>
  }

  renderBills (bills): Array<React$Element<*>> {
    return bills.map((bill, i) => {
      return <BillCell key={bill.id} styles={billRule} bill={bill} />
    })
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    marginBottom: 15,
    '> h2': {
      display: 'inline-block',
      marginBottom: 5,
      ...mobile({
        marginBottom: 0
      })
    },
    '> div': {
      fontSize: 18,
      ':first-of-type': {
        display: 'inline-block',
        marginLeft: 5
      },
      ...mobile({
        fontSize: 16,
        ':first-of-type': {
          display: 'none'
        }
      })
    }
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 30,
    ...mobile({
      marginTop: 20
    })
  }
})

BillsList = createPaginationContainer(BillsList, graphql`
  fragment BillsList_viewer on Viewer {
    bills(
      first: $count,
      after: $cursor,
      query: $query,
      from: $startDate,
      to: $endDate
    ) @connection(key: "BillsList_bills") {
      count
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          ...BillCell_bill
        }
      }
    }
  }
`, {
  direction: 'forward',
  query: graphql`
    query BillsListQuery(
      $count: Int!,
      $cursor: String!,
      $query: String!,
      $startDate: Time!,
      $endDate: Time!
    ) {
      viewer {
        ...BillsList_viewer
      }
    }
  `,
  getConnectionFromProps (props) {
    return props.viewer && props.viewer.bills
  },
  getFragmentVariables (prevVars, totalCount) {
    return {
      ...prevVars,
      count: totalCount
    }
  },
  getVariables (props, { count, cursor }, fragmentVariables) {
    return {
      ...fragmentVariables,
      count,
      cursor
    }
  }
})

export { BillsList }