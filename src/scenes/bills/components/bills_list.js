// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import BillCell from './bill_cell'
import LoadMoreButton from './load_more_button'
import { unwrap } from '../../../types/connection'
import type { Bill, Connection, RelayProp } from '../../../types' // eslint-disable-line

class BillsList extends Component {
  props: {
    bills: Connection<Bill>,
    onLoadMore: () => void
  }

  // events
  didClickLoadMore = () => {
    this.props.onLoadMore()
  }

  // lifecycle
  render () {
    const { bills: connection, onLoadMore } = this.props

    const bills = unwrap(connection)
    const hasNextPage = bills.pageInfo && bills.pageInfo.hasNextPage

    return <div className={css(styles.container)}>
      {bills.nodes.map((bill, i) => {
        return <BillCell key={bill.id} bill={bill} isLast={i === bills.nodes.length - 1} />
      })}
      <LoadMoreButton style={styles.loadMoreButton} hasMore={hasNextPage} onClick={onLoadMore} />
    </div>
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
