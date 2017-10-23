/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { AdminBillsScene } from '../AdminBillsScene'
import { auth } from 'shared/auth'
import { routerProps } from 'mocks/routerProps'

// mocks
jest.mock('shared/auth', () => ({
  auth: { signOut: jest.fn() }
}))

let subject
let props

function loadSubject () {
  subject = shallow(<AdminBillsScene {...props} />).dive().dive()
}

beforeEach(() => {
  props = {
    viewer: { isAdmin: false }
  }
  subject = null
})

describe('#componentWillReceiveProps', () => {
  it('signs the user out if not an admin', () => {
    loadSubject()
    subject.instance().componentWillReceiveProps(props)
    expect(auth.signOut).toHaveBeenCalled()
  })

  it('redirects to the admin sign-in when not an admin', () => {
    loadSubject()
    subject.instance().componentWillReceiveProps(props)
    expect(routerProps.history.replace).toHaveBeenCalledWith('/admin/sign-in')
  })
})
