// @flow
import React, { Component } from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import type { RelayRefetchProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import { throttle } from 'lodash'
import { initialVariables } from './searchRoute'
import { Intro, SearchField, BillsList, LoadingIndicator } from './components'
import { session } from 'shared/storage'
import { stylesheet, colors, mobile, utils } from 'shared/styles'
import type { Viewer, Location } from 'shared/types'

let SearchScene = class SearchScene extends Component {
  props: {
    viewer: ?Viewer,
    location: Location,
    relay: RelayRefetchProp
  }

  state = {
    query: initialVariables.query,
    disableAnimations: false
  }

  // events
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
    this.props.relay.refetch(variables, null, (error: ?Error) => {
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

    return <div {...rules.container}>
      <div {...rules.header}>
        <div {...rules.background} />
        <Intro styles={rules.section} />
        <SearchField
          styles={rules.section}
          value={query}
          onChange={this.searchFieldDidChange}
        />
      </div>
      <div {...rules.content}>
        <div {...rules.indicator}>
          <LoadingIndicator isLoading={!viewer} />
        </div>
        {viewer && <BillsList
          viewer={viewer}
          animated={!disableAnimations}
        />}
      </div>
    </div>
  }
}

SearchScene = createRefetchContainer(withRouter(SearchScene),
  graphql`
    fragment SearchScene_viewer on Viewer {
      bills(
        first: $count,
        after: $cursor,
        query: $query,
        from: $startDate,
        to: $endDate
      ) {
        edges { node { id } }
      }
      ...BillsList_viewer
    }
  `,
  graphql`
    query SearchSceneQuery(
      $count: Int!,
      $cursor: String!,
      $query: String!,
      $startDate: Time!,
      $endDate: Time!
    ) {
      viewer {
        ...SearchScene_viewer
      }
    }
  `
)

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

export { SearchScene }
