// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import BillCell from './bill_cell'
import BillAnimation, { billStyle } from './bill_animation'
import LoadMoreButton from './load_more_button'
import { unwrap } from 'shared/types/connection'
import type { Bill, Connection } from 'shared/types' // eslint-disable-line

class BillsList extends Component {
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

    return <div className={css(styles.container)}>
      <BillAnimation disable={!animated}>{this.renderCells(bills.nodes)}</BillAnimation>
      <LoadMoreButton style={styles.loadMoreButton} hasMore={hasNextPage} onClick={onLoadMore} />
    </div>
  }

  renderCells (bills: Array<Bill>): Array<React$Element<*>> {
    return bills.map((bill, i) => {
      return <BillCell key={bill.id} style={billStyle} bill={bill} isLast={i === bills.length - 1} />
    })
  }
}

const styles = StyleSheet.create({
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

export default Relay.createContainer(BillsList, {
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
