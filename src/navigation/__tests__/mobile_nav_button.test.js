/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { MobileNavButton } from '../mobile_nav_button'
import { dispatch } from 'shared/dispatcher'

// mocks
jest.mock('shared/dispatcher', () => {
  return { dispatch: jest.fn() }
})

// subject
let subject
let isOpen = false

function loadSubject () {
  subject = shallow(<MobileNavButton isOpen={isOpen} />)
}

let element = {
  icon: () => subject.find('FontAwesome')
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('sets the icon to open when closed', () => {
    isOpen = false
    loadSubject()
    expect(element.icon()).toHaveProp('name', 'bars')
  })

  it('sets the icon to close when open', () => {
    isOpen = true
    loadSubject()
    expect(element.icon()).toHaveProp('name', 'close')
  })
})

describe('on click', () => {
  it('closes the menu when open', () => {
    isOpen = true
    loadSubject()
    subject.simulate('click')
    expect(dispatch).toHaveBeenCalledWith('close-menu')
  })

  it('opens the menu when closed', () => {
    isOpen = false
    loadSubject()
    subject.simulate('click')
    expect(dispatch).toHaveBeenCalledWith('open-menu')
  })
})
