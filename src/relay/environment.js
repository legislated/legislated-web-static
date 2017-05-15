// @flow
import Relay, { DefaultNetworkLayer, Environment } from 'react-relay'
import config from '../config'

type EnvironmentListener = (environment: Object) => void

let _listener: ?EnvironmentListener = null

export const environment = {
  on (listener: EnvironmentListener) {
    _listener = listener
  },
  off () {
    _listener = null
  },
  recreate (headers: Object = {}) {
    // recreate relay environment
    const environment = new Environment()
    const networkLayer = new DefaultNetworkLayer(config.graphUrl, { headers })
    environment.injectNetworkLayer(networkLayer)

    _listener && _listener(environment)
  }
}
