// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import type moment from 'moment'
import { BillCell } from './BillCell'
import { BillAnimation, billRule } from './BillAnimation'
import { LoadMoreButton } from './LoadMoreButton'
import { stylesheet, mobile } from 'shared/styles'
import type { Bill, SearchConnection } from 'shared/types' // eslint-disable-line
import { unwrap } from 'shared/types/Connection'

function format (date: moment): string {
  return date.format('MMM Do')
}

let BillsList = class BillsList extends Component {
  props: {
    bills: SearchConnection<Bill>,
    startDate: moment,
    endDate: moment,
    animated: Boolean,
    onLoadMore: () => void,
  }

  // lifecycle
  render () {
    const { bills: connection, startDate, endDate, animated, onLoadMore } = this.props
    const { pageInfo, count } = connection

    const bills = unwrap(connection)

    return <div {...rules.container}>
      <div {...rules.header}>
        <h2>Upcoming Bills</h2>
        <div>{`${format(startDate)} to ${format(endDate)}`}</div>
        <div>{`Found ${count} result${count === 1 ? '' : 's'}.`}</div>
      </div>
      <BillAnimation disable={!animated}>
        {this.renderBills(bills)}
      </BillAnimation>
      <LoadMoreButton
        styles={rules.loadMoreButton}
        hasMore={pageInfo.hasNextPage}
        onClick={onLoadMore}
      />
    </div>
  }

  renderBills (bills: Array<Bill>): Array<React$Element<*>> {
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

BillsList = createFragmentContainer(BillsList, graphql`
  fragment BillsList_bills on BillSearchConnection {
    count
    edges {
      node {
        id
        ...BillCell_bill
      }
    }
    pageInfo {
      hasNextPage
    }
  }
`)

export { BillsList }
