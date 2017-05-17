/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { AdminBillsScene } from '../scene'
import { auth } from 'shared/auth'

// mocks
jest.mock('shared/auth', () => ({
  auth: { signOut: jest.fn() }
}))

// subject
let subject
let viewer
let router = { replace: jest.fn() }

function loadSubject () {
  const context = { router }
  subject = shallow(<AdminBillsScene viewer={viewer} />, { context })
}

// spec
afterEach(() => {
  subject = null
})

describe('#componentWillReceiveProps', () => {
  it('redirects home when the user is not an admin', () => {
    loadSubject()
    viewer = { isAdmin: false }
    subject.instance().componentWillReceiveProps({ viewer })
    expect(router.replace).toHaveBeenCalledWith('/admin')
  })

  it('signs out the user if it is not an admin', () => {
    loadSubject()
    viewer = { isAdmin: false }
    subject.instance().componentWillReceiveProps({ viewer })
    expect(auth.signOut).toHaveBeenCalled()
  })
})
