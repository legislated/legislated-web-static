// @flow
import Relay from 'react-relay'

export function createRelayEnvironment () {
  // TODO: branch based on environment
  const endpoint = 'http://localhost:5000/graphql'
  // NOTE: this becomes a bit more complex when we support sign-in/out
  Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(endpoint))
}
