// @flow
import { Environment, RecordSource, Store, Network } from 'relay-runtime'
import config from '../config'
import { events } from 'shared/events'

// current environment
let environment = createEnvironment()

function didSetAuthHeader (header: string) {
  environment = createEnvironment({ 'Authorization': header })
  events.emit(events.setEnvironment)
}

export function currentEnvironment (): Object {
  return environment
}

events.on(events.setAuthHeader, didSetAuthHeader)

// helpers
// see: https://facebook.github.io/relay/docs/network-layer.html
function createQuery (headers: Object) {
  return async function query (operation, variables): Object {
    const response = await fetch(config.graphUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    })

    return response.json()
  }
}

// see: https://facebook.github.io/relay/docs/relay-environment.html
function createEnvironment (headers: Object = {}): Object {
  const source = new RecordSource()
  const store = new Store(source)
  const network = Network.create(createQuery(headers))

  return new Environment({ store, network })
}
