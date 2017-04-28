/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Container } from '../container'
import { on, off } from 'shared/dispatcher'

// mocks
jest.mock('shared/dispatcher', () => {
  return { on: jest.fn(), off: jest.fn() }
})

// subject
let subject
let instance

function loadSubject () {
  subject = shallow(<Container />)
  instance = subject.instance()
}

let element = {
  header: () => subject.find('Header'),
  mobileNav: () => subject.find('MobileNav')
}

// spec
afterEach(() => {
  subject = null
})

describe('#state', () => {
  it('default the menu to closed', () => {
    loadSubject()
    expect(subject).toHaveState('menuOpen', false)
  })
})

describe('#render', () => {
  beforeEach(() => {
    loadSubject()
    subject.setState({ menuOpen: true })
  })

  it('marks the header menu as open', () => {
    expect(element.header()).toHaveProp('menuOpen', true)
  })

  it('marks the mobile nav as open', () => {
    expect(element.mobileNav()).toHaveProp('isOpen', true)
  })
})

describe('#componentWillMount', () => {
  it('subscribes to menu events', () => {
    loadSubject()
    expect(on).toHaveBeenCalledWith('open-menu', instance.didOpenMenu)
    expect(on).toHaveBeenCalledWith('close-menu', instance.didCloseMenu)
  })
})

describe('#componentWillUnmount', () => {
  it('unsubscribes from menu events', () => {
    loadSubject()
    subject.unmount()
    expect(off).toHaveBeenCalledWith('open-menu', instance.didOpenMenu)
    expect(off).toHaveBeenCalledWith('close-menu', instance.didCloseMenu)
  })
})

describe('on menu opened', () => {
  it('sets the menu state to open', () => {
    loadSubject()
    instance.didOpenMenu()
    expect(subject).toHaveState('menuOpen', true)
  })
})

describe('on menu closed', () => {
  it('sets the menu state to closed', () => {
    loadSubject()
    subject.setState({ menuOpen: true })
    instance.didCloseMenu()
    expect(subject).toHaveState('menuOpen', false)
  })
})
