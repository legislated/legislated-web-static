/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { AdminGate } from '../AdminGate'
import { auth } from 'shared/auth'

// mocks
jest.mock('shared/auth', () => ({
  auth: { signIn: jest.fn() }
}))

// subject
let subject

function loadSubject () {
  subject = shallow(<AdminGate />)
}

const element = {
  username: () => subject.find(`input[name='username']`),
  password: () => subject.find(`input[name='password']`),
  submit: () => subject.find('Button')
}

// spec
afterEach(() => {
  subject = null
})

function itBehavesLikeAFormField (element, value) {
  it('updates the state on change', () => {
    loadSubject()
    const field = element()
    const name = field.prop('name')
    field.simulate('change', { target: { value, name } })
    expect(subject).toHaveState(name, value)
  })
}

describe('the username field', () => {
  itBehavesLikeAFormField(element.username, 'hello')
})

describe('the password field', () => {
  itBehavesLikeAFormField(element.password, 'world')
})

describe('on submit', () => {
  it('signs the user in', () => {
    loadSubject()
    subject.setState({ username: 'hello', password: 'world' })
    element.submit().simulate('click')
    expect(auth.signIn).toHaveBeenCalledWith('hello', 'world')
  })
})
