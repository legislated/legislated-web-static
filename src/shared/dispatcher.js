// @flow
import Events from 'ampersand-events'

const dispatcher = Events.createEmitter()

type Event = 'menu-changed'
type EventHandler = (args: any) => void

export function dispatch (event: Event, args: any) {
  dispatcher.trigger(event, args)
}

export function on (event: Event, handler: EventHandler) {
  dispatcher.on(event, handler)
}

export function off (event: Event, handler: EventHandler) {
  dispatcher.off(event, handler)
}
