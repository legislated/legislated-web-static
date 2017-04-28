/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../header'
import { dispatch } from 'shared/dispatcher'

// mocks
jest.mock('shared/dispatcher', () => {
  return { dispatch: jest.fn() }
})

// subject
let subject
let menuOpen = false

function loadSubject () {
  subject = shallow(<Header menuOpen={menuOpen} />)
}

let element = {
  logo: () => subject.find('Link'),
  mobileNavButton: () => subject.find('MobileNavButton')
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('marks the mobile nav button as open', () => {
    menuOpen = true
    loadSubject()
    expect(element.mobileNavButton()).toHaveProp('isOpen', true)
  })
})

describe('on click', () => {
  it('closes the menu', () => {
    loadSubject()
    element.logo().simulate('click')
    expect(dispatch).toHaveBeenCalledWith('close-menu')
  })
})
