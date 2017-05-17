// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { throttle } from 'lodash'
import { Intro, SearchField, BillsList, LoadingIndicator } from './components'
import { session } from 'shared/storage'
import { stylesheet, colors, mobile, utils } from 'shared/styles'
import type { Viewer, Location, RelayProp } from 'shared/types'

const pageSize = 25

let SearchScene = class SearchScene extends Component {
  props: {
    relay: RelayProp,
    viewer: ?Viewer,
    location: Location
  }

  state = {
    query: '',
    disableAnimations: false
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
    this.setVariablesUnanimated({ query })
  }, 300)

  // helpers
  setVariablesUnanimated (variables: Object) {
    this.setState({ disableAnimations: true })
    this.props.relay.setVariables(variables, (readyState) => {
      if (readyState.done) {
        requestAnimationFrame(() => {
          this.setState({ disableAnimations: false })
        })
      }
    })
  }

  // lifecycle
  componentWillMount () {
    const { location } = this.props
    const count = session.get('@@legislated/last-search-count')

    if (count && location && location.action === 'POP') {
      const first = Number.parseInt(count)
      this.setVariablesUnanimated({ first })
    }

    session.set('@@legislated/last-search-count', null)
  }

  componentWillUnmount () {
    const { first } = this.props.relay.variables
    session.set('@@legislated/last-search-count', `${first}`)
  }

  render () {
    const { query, disableAnimations } = this.state
    const { viewer, relay } = this.props
    const { startDate, endDate } = relay.variables

    return <div {...rules.container}>
      <div {...rules.header}>
        <div {...rules.background} />
        <Intro styles={rules.section} />
        <SearchField
          styles={rules.section}
          value={query}
          onChange={this.searchFieldDidChange} />
      </div>
      <div {...rules.content}>
        <div {...rules.indicator}>
          <LoadingIndicator isLoading={!viewer} />
        </div>
        {viewer && <BillsList
          bills={viewer.bills}
          startDate={startDate}
          endDate={endDate}
          animated={!disableAnimations}
          onLoadMore={this.didClickLoadMore} />}
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    ...utils.column
  },
  header: {
    position: 'relative',
    marginBottom: 30,
    ...mobile({
      marginBottom: 15
    })
  },
  background: {
    position: 'absolute',
    top: -30,
    bottom: 0,
    left: -30,
    width: '100vw',
    zIndex: -1,
    backgroundColor: colors.backgroundAccent,
    ...mobile({
      left: -15
    })
  },
  section: {
    marginBottom: 30,
    ...mobile({
      marginBottom: 15
    })
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

SearchScene = Relay.createContainer(SearchScene, {
  initialVariables: {
    first: pageSize,
    query: '',
    startDate: moment(),
    endDate: moment()
  },
  prepareVariables (previousVariables) {
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

export { SearchScene }
