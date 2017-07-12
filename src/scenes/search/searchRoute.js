// @flow
import React from 'react'
import { graphql } from 'react-relay'
import moment from 'moment'
import { SearchScene } from './SearchScene'
import type { RelayRouteDestination } from 'shared/types'

export const initialVariables = {
  count: 20,
  cursor: '',
  query: '',
  startDate: moment().startOf('day'),
  endDate: moment().add(6, 'days').endOf('day')
}

export const searchRoute: RelayRouteDestination<*, *, *> = {
  component: SearchScene,
  query: graphql`
    query searchRouteQuery(
      $count: Int!,
      $cursor: String!
      $query: String!,
      $startDate: Time!,
      $endDate: Time!
    ) {
      viewer {
        ...SearchScene_viewer
      }
    }
  `,
  initialVariables,
  render (props) {
    if (props) {
      return <SearchScene {...props} />
    } else {
      return <SearchScene viewer={null} />
    }
  }
}
