// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { throttle } from 'lodash'
import { SearchField, BillsList, LoadingIndicator } from './components'
import { stylesheet, utils } from 'shared/styles'
import type { Viewer, RelayProp } from 'shared/types'

const pageSize = 25

class Scene extends Component {
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

    return <div {...rules.container}>
      <SearchField
        styles={rules.searchField}
        value={query}
        onChange={this.searchFieldDidChange} />
      <div {...rules.content}>
        <div {...rules.indicator}>
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
      onLoadMore={this.didClickLoadMore} />
  }
}

const rules = stylesheet({
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

export const BillsScene = Relay.createContainer(Scene, {
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
