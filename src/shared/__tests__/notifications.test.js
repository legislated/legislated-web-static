/* eslint-env jest */
import { notifications } from '../notifications'

const subject = notifications

describe('#add', () => {
  afterEach(notifications.off)

  it('notifies the listener', () => {
    let received
    let notification = { key: 'test', message: 'wow' }
    subject.on((n) => { received = n })
    subject.add(notification)
    expect(received).toEqual(notification)
  })
})
