// @flow
import React from 'react'
import { graphql } from 'react-relay'
import moment from 'moment'
import { SearchScene } from './SearchScene'
import type { RelayRouteConfig } from 'shared/types'
import { session } from 'shared/storage'

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
  render (props) {
    if (props) {
      return <SearchScene {...props} />
    } else {
      return <SearchScene viewer={null} />
    }
  }
}
