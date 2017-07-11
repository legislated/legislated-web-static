// @flow
import React from 'react'
import { SearchScene, queryConfig } from './SearchScene'
import type { RelayRouteDestination } from 'shared/types'

export const searchRoute: RelayRouteDestination<*, *, *> = {
  component: SearchScene,
  ...queryConfig,
  render (props) {
    if (props) {
      return <SearchScene {...props} />
    } else {
      return <SearchScene viewer={null} />
    }
  }
}
