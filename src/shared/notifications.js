// @flow
export type Notification = {
  key: string,
  message: string
}

type NotificationListener = (Notification) => (void | Promise<void>)

let _listener: ?NotificationListener = null

export const notifications = {
  on (listener: NotificationListener) {
    _listener = listener
  },
  off () {
    _listener = null
  },
  add (notification: Notification) {
    _listener && _listener(notification)
  }
}
