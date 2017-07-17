// @flow
import React from 'react'
import { graphql } from 'react-relay'
import moment from 'moment'
import { last } from 'lodash'
import { SearchScene } from './SearchScene'
import { session } from 'shared/storage'
import type { Viewer, RelayRouteConfig } from 'shared/types'

export const constants = {
  query: '',
  count: 20,
  startDate: moment().startOf('day'),
  endDate: moment().add(6, 'days').endOf('day')
}

export const searchRoute: RelayRouteConfig = {
  query: graphql`
    query searchRouteQuery(
      $count: Int!, $cursor: String!
      $query: String!, $startDate: Time!, $endDate: Time!
    ) {
      viewer {
        ...SearchScene_viewer
      }
    }
  `,
  getInitialVariables (props) {
    // preserve the last search count on pop so that we can restore to the
    // correct scroll position
    const lastCount = session.get('last-search-count')
    session.set('last-search-count', null)

    let count = null
    if (lastCount && props.history.action === 'POP') {
      count = Number.parseInt(lastCount)
    }

    return {
      ...constants,
      count: count || constants.count,
      cursor: ''
    }
  },
  cacheResolver: {
    queryId: 'BillsConnection',
    canCacheRequest (operation, variables) {
      // dig through query to check for the bills connection
      const viewer = operation.query.selections.find((s) => s.name === 'viewer')
      const children = viewer && viewer.selections
      const connection = children && children.find((s) => s.name === 'bills')

      return !!connection
    },
    setCachedResponse (operation, variables, data, cache) {
      cache.set(this.queryId, variables, data)
    },
    getCachedResponse (operation, variables, cache) {
      type Response = { data: { viewer: Viewer } }

      const { count } = constants

      let { count: remaining } = variables
      let response: ?Response = null

      for (; remaining > 0; remaining -= count) {
        // retrieve this page from the cache
        const lastEdge = response && last(response.data.viewer.bills.edges)
        const pageVariables = {
          ...variables,
          count,
          cursor: lastEdge ? lastEdge.cursor : variables.cursor
        }

        const page: ?Response = cache.get(this.queryId, pageVariables)

        // if we ever miss, just return null; we need to fetch
        if (!page) {
          return null
        }

        // merge the edges / info from this page
        const { bills: pageBills } = page.data.viewer

        if (!response) {
          response = page
        } else {
          const { bills } = response.data.viewer
          bills.edges.concat(pageBills.edges)
          bills.pageInfo = pageBills.pageInfo
        }
      }

      return response
    }
  },
  render (props) {
    if (props) {
      return <SearchScene {...props} />
    } else {
      return <SearchScene viewer={null} />
    }
  }
}
