/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { MobileNav } from '../mobile_nav'
import { dispatch } from 'shared/dispatcher'

// mocks
jest.mock('shared/dispatcher', () => {
  return { dispatch: jest.fn() }
})

// subject
let subject
let isOpen = false

function loadSubject () {
  subject = shallow(<MobileNav isOpen={isOpen} />)
}

let element = {
  list: () => subject.find('NavLinkList')
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the nav link icons', () => {
    loadSubject()
    expect(element.list()).toHaveProp('showsIcons', true)
  })
})

describe('when the overlay is tapped', () => {
  it('closes the menu', () => {
    isOpen = true
    loadSubject()
    subject.simulate('stateChange', { isOpen: false })
    expect(dispatch).toHaveBeenCalledWith('close-menu')
  })
})

describe('when closed', () => {
  it('ignores state changes', () => {
    isOpen = false
    loadSubject()
    subject.simulate('stateChange', { isOpen: false })
    expect(dispatch).not.toHaveBeenCalled()
  })
})
