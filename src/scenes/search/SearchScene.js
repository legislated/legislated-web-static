// @flow
import React, { Component } from 'react'
import { createPaginationContainer, graphql } from 'react-relay/compat'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { throttle } from 'lodash'
import { Intro, SearchField, BillsList, LoadingIndicator } from './components'
import { session } from 'shared/storage'
import { stylesheet, colors, mobile, utils } from 'shared/styles'
import type { Viewer, Location, RelayProp, RelayQueryConfig } from 'shared/types'

const pageSize = 25

let SearchScene = class SearchScene extends Component {
  props: {
    relay: RelayProp,
    location: Location,
    viewer: ?Viewer
  }

  state = {
    query: '',
    disableAnimations: false
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(pageSize, (error: ?Error) => {
      if (error) {
        console.error(`error loading next page: ${error.toString()}`)
      }
    })
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
    this.props.relay.refetchConnection(pageSize, (error: ?Error) => {
      if (error) {
        console.error(`error updaing query: ${error.toString()}`)
      }

      requestAnimationFrame(() => {
        this.setState({ disableAnimations: false })
      })
    }, variables)
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
    const { viewer } = this.props
    const { query, disableAnimations } = this.state
    const { startDate, endDate } = queryConfig.variables

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
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 30,
    ...mobile({
      marginTop: 20
    })
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...utils.column
  }
})

export const queryConfig: RelayQueryConfig<*> = {
  query: graphql`
    query SearchSceneQuery(
      $first: Int!
      $startDate: Time!
      $endDate: Time!
      $query: String!
    ) {
      viewer {
        ...SearchScene_viewer
      }
    }
  `,
  variables: {
    first: pageSize,
    startDate: moment().startOf('day'),
    endDate: moment().add(6, 'days').endOf('day'),
    query: ''
  }
}

SearchScene = createPaginationContainer(withRouter(SearchScene), graphql`
  fragment SearchScene_viewer on Viewer {
    bills(
      first: $first,
      from: $startDate,
      to: $endDate,
      query: $query
    ) @connection(key: "SearchScene_bills") {
      edges { node { id } }
      ...BillsList_bills
    }
  }
`, {
  direction: 'forward',
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
  },
  query: queryConfig.query
})

export { SearchScene }
