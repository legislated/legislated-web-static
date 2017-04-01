const Relay = require.requireActual('react-relay')

// mocks
export class Mutation extends Relay.Mutation {
  _resolveProps (props) {
    this.props = props
  }
}

export class MockStore {
  reset () {
    this.successResponse = undefined
  }

  succeedWith (response) {
    this.reset()
    this.successResponse = response
  }

  failWith (response) {
    this.reset()
    this.failureResponse = response
  }

  update (callbacks) {
    if (this.successResponse) {
      callbacks.onSuccess(this.successResponse)
    } else if (this.failureResponse) {
      callbacks.onFailure(this.failureResponse)
    }
    this.reset()
  }

  commitUpdate (mutation, callbacks) {
    return this.update(callbacks)
  }

  applyUpdate (mutation, callbacks) {
    return this.update(callbacks)
  }
}

// exports
export const Store = new MockStore()
export const Route = Relay.Route
export const PropTypes = Relay.PropTypes

export default {
  Store,
  Mutation,
  QL: Relay.QL,
  Route: Relay.Route,
  PropTypes: Relay.PropTypes,
  createContainer: (component, config) => {
    return {
      ...component,
      get relayConfig () {
        return config
      }
    }
  }
}
