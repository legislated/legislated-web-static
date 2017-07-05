// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import { withRouter } from 'react-router'
import { SearchScene } from './SearchScene'

export const searchRoute = {
  component: withRouter(SearchScene),
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
