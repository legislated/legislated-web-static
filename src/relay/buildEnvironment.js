// @flow
import { DefaultNetworkLayer, Environment } from 'react-relay/classic'
import config from '../config'

export function buildEnvironment (headers: Object = {}): any {
  // recreate relay environment
  const environment = new Environment()
  const networkLayer = new DefaultNetworkLayer(config.graphUrl, { headers })
  environment.injectNetworkLayer(networkLayer)
  return environment
}
