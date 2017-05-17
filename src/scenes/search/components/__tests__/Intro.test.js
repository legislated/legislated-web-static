/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Intro } from '../Intro'
import { local } from 'shared/storage'

// subject
let subject

function loadSubject () {
  subject = shallow(<Intro />)
}

const element = {
  animation: () => subject.find('BillAnimation'),
  accept: () => subject.find('Link').at(1)
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
    local.set('@@legislated/intro-visited', 'true')
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
    expect(local.get('@@legislated/intro-visited')).toEqual('true')
  })
})
