// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { throttle } from 'lodash'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import { SearchField, BillsList, LoadingIndicator } from './components'
import { utils } from '../styles'
import type { Viewer, RelayProp } from '../../types'

const pageSize = 25

class BillsView extends Component {
  props: {
    viewer: ?Viewer,
    relay: ?RelayProp
  }

  state = {
    query: '',
    isFiltering: false
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    relay && relay.setVariables({ first: relay.variables.first + pageSize })
  }

  searchFieldDidChange = (query: string) => {
    this.setState({ query })
    this.filterBillsForQuery(query)
  }

  filterBillsForQuery = throttle((query: string) => {
    const { relay } = this.props
    if (!relay) {
      return
    }

    this.setState({ isFiltering: true })
    relay && relay.setVariables({ query }, (readyState) => {
      if (readyState.done) {
        requestAnimationFrame(() => {
          this.setState({ isFiltering: false })
        })
      }
    })
  }, 300)

  // lifecycle
  render () {
    const { query } = this.state
    const { viewer, relay } = this.props

    return <div className={css(styles.container)}>
      <SearchField style={styles.searchField} value={query} onChange={this.searchFieldDidChange} />
      <div className={css(styles.content)}>
        <div className={css(styles.indicator)}>
          <LoadingIndicator isLoading={!viewer} />
        </div>
        {viewer && relay && this.renderBills(viewer, relay)}
      </div>
    </div>
  }

  renderBills (viewer: Viewer, relay: RelayProp): React$Element<*> {
    const { isFiltering } = this.state

    return <BillsList
      bills={viewer.bills}
      animated={!isFiltering}
      onLoadMore={this.didClickLoadMore}
    />
  }
}

const styles = StyleSheet.create({
  container: {
    ...utils.column
  },
  searchField: {
    marginBottom: 30
  },
  content: {
    ...utils.column,
    position: 'relative'
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...utils.column
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
