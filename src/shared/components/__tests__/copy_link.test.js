/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { CopyLink } from '../copy_link'
import { notifications } from 'shared/notifications'

// mocks
jest.mock('shared/notifications', () => ({
  notifications: { add: jest.fn() }
}))

// subject
let subject
let value

function loadSubject () {
  subject = shallow(<CopyLink value={value} />)
}

const element = {
  clipboard: () => subject.find('CopyToClipboard')
}

// spec
afterEach(() => {
  subject = null
})

describe('on click', () => {
  it('copies the value', () => {
    value = 'http://fake.url/'
    loadSubject()
    expect(element.clipboard()).toHaveProp('text', value)
  })
})

describe('on copy', () => {
  it('fires a notification', () => {
    loadSubject()
    value = 'http://fake.url/'
    element.clipboard().simulate('copy', value)
    expect(notifications.add).toHaveBeenCalledWith({
      key: 'copy-link',
      message: expect.stringMatching(/[Cc]opied/)
    })
  })
})
