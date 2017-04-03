// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { throttle } from 'lodash'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import { SearchField, BillsList } from './components'
import type { Viewer, RelayProp } from '../../types'

const pageSize = 25

class BillsView extends Component {
  props: {
    viewer: ?Viewer,
    relay: ?RelayProp
  }

  state = {
    query: ''
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    if (relay) {
      relay.setVariables({ first: relay.variables.first + pageSize })
    }
  }

  searchFieldDidChange = (query: string) => {
    this.setState({ query })
    this.fetchBillsForQuery(query)
  }

  fetchBillsForQuery = throttle((query: string) => {
    const { relay } = this.props
    if (relay) {
      relay.setVariables({ query })
    }
  }, 300)

  // lifecycle
  render () {
    const { query } = this.state
    const { viewer } = this.props

    return <div className={css(styles.container)}>
      <SearchField style={styles.searchField} value={query} onChange={this.searchFieldDidChange} />
      {viewer && <BillsList bills={viewer.bills} onLoadMore={this.didClickLoadMore} />}
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
      ...previousVariables,
      startDate: moment().startOf('day'),
      endDate: moment().add(6, 'days').endOf('day')
    }
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        bills(first: $first, from: $startDate, to: $endDate, query: $query) {
          ${BillsList.getFragment('bills')}
        }
      }
    `
  }
})
