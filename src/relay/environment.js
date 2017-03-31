// @flow
import Relay from 'react-relay'
import config from '../config'

export function createRelayEnvironment () {
  // NOTE: this becomes a bit more complex when we support sign-in/out
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(config.graphUrl)
  )
}
