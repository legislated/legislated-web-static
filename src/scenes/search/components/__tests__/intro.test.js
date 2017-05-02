/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Intro } from '../intro'
import { get, set } from 'shared/storage'

// mocks
jest.mock('shared/storage', () => {
  return { get: jest.fn(), set: jest.fn() }
})

// subject
let subject

function loadSubject () {
  subject = shallow(<Intro />)
}

const element = {
  animation: () => subject.find('BillAnimation'),
  accept: () => subject.find('div > Link')
}

// spec
afterEach(() => {
  subject = null
})

describe('#state', () => {
  it('default to unaccepted', () => {
    loadSubject()
    expect(subject).toHaveState('isAccepted', false)
  })
})

describe('#render', () => {
  it(`does not render when it's already visited`, () => {
    get.mockReturnValueOnce('true')
    loadSubject()
    expect(subject.get(0)).toBeFalsy()
  })
})

describe('when the user clicks accept', () => {
  it('hides the intro', () => {
    loadSubject()
    element.accept().simulate('click')
    expect(element.animation().children()).toHaveLength(0)
  })

  it('marks the intro as visited', () => {
    loadSubject()
    element.accept().simulate('click')
    expect(set).toHaveBeenCalledWith('visited-intro', 'true')
  })
})
