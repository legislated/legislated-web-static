/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../header'

// subject
let subject
let menuOpen = false

function loadSubject () {
  subject = shallow(<Header menuOpen={menuOpen} />)
}

let element = {
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
