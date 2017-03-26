// @flow
import Relay from 'react-relay'

export const BillsQueries = {
  viewer: () => Relay.QL`query { viewer }`
}
