// @flow
import React from 'react'
import Relay from 'react-relay'
import { SearchScene } from './scene'

export const searchRoute = {
  component: SearchScene,
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  render: ({ props }: { props: Object }) => {
    if (props) {
      return <SearchScene {...props} />
    } else {
      return <SearchScene viewer={null} />
    }
  }
}
