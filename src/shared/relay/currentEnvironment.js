// @flow
import { Environment, RecordSource, Store, Network, QueryResponseCache } from 'relay-runtime'
import config from 'shared/config'
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
  const cache = new QueryResponseCache({ size: 250, ttl: 60 * 5 * 1000 })

  return async function query (operation, variables): Object {
    // just use the query name for now since id is always null
    const { name: queryId } = operation.name

    // first check for a cache hit
    let response = cache.get(queryId, variables)
    if (response) {
      return response
    }

    // fetch data if missed and cache response
    response = await fetch(config.graphUrl, {
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

    const json = await response.json()
    cache.set(queryId, variables, json)

    return json
  }
}

// see: https://facebook.github.io/relay/docs/relay-environment.html
function createEnvironment (headers: Object = {}): Object {
  const source = new RecordSource()
  const store = new Store(source)
  const network = Network.create(createQuery(headers))

  return new Environment({ store, network })
}
