/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Intro } from '../Intro'
import { local } from 'shared/storage'

let subject
let props

function loadSubject () {
  subject = shallow(<Intro {...props} />)
}

function test () {
  expect(subject).toMatchSnapshot()
}

const element = {
  accept: () => subject.find('Link').at(1)
}

beforeEach(() => {
  props = {}
  subject = null
})

describe('#render', () => {
  it('renders correctly', () => {
    loadSubject()
    test()
  })
  it('when it is cleared', () => {
    local.set('intro-cleared', 'true')
    loadSubject()
    test()
  })
  it('when the user clicks accept', () => {
    loadSubject()
    element.accept().simulate('click')
    test()
  })
})
