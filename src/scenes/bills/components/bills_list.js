// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { BillCell } from './bill_cell'
import { BillAnimation, billRule } from './bill_animation'
import { LoadMoreButton } from './load_more_button'
import { stylesheet } from 'shared/styles'
import type { Bill, Connection } from 'shared/types' // eslint-disable-line
import { unwrap } from 'shared/types/connection'

class List extends Component {
  props: {
    bills: Connection<Bill>,
    animated: Boolean,
    onLoadMore: () => void,
  }

  // events
  didClickLoadMore = () => {
    this.props.onLoadMore()
  }

  // lifecycle
  render () {
    const { bills: connection, animated, onLoadMore } = this.props

    const bills = unwrap(connection)
    const hasNextPage = bills.pageInfo && bills.pageInfo.hasNextPage

    return <div {...rules.container}>
      <BillAnimation disable={!animated}>
        {this.renderCells(bills.nodes)}
      </BillAnimation>
      <LoadMoreButton styles={rules.loadMoreButton} hasMore={hasNextPage} onClick={onLoadMore} />
    </div>
  }

  renderCells (bills: Array<Bill>): Array<React$Element<*>> {
    return bills.map((bill, i) => {
      return <BillCell
        key={bill.id}
        styles={billRule}
        bill={bill} />
    })
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 30
  }
})

export const BillsList = Relay.createContainer(List, {
  fragments: {
    bills: () => Relay.QL`
      fragment on BillConnection {
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
    `
  }
})
