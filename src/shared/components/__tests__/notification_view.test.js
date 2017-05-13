/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { NotificationView } from '../notification_view'
import { notifications } from 'shared/notifications'

jest.mock('shared/async', () => ({
  sleep: () => Promise.resolve()
}))

// subject
let subject

function loadSubject () {
  subject = shallow(<NotificationView />)
}

// spec
afterEach(() => {
  subject = null
})

describe('after receiving a notification', () => {
  it('shows the notification', () => {
    loadSubject()
    subject.instance().componentDidMount()
    notifications.add('note')
    expect(subject).toHaveState('isHidden', false)
    expect(subject).toHaveState('notification', 'note')
  })

  it('hides the notification after a delay', async () => {
    loadSubject()
    await subject.instance().didReceiveNotification('note')
    expect(subject).toHaveState('isHidden', true)
    expect(subject).toHaveState('notification', null)
  })
})
