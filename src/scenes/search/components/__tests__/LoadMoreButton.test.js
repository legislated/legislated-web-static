/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { LoadMoreButton } from '../LoadMoreButton'

let subject
let props

function loadSubject () {
  subject = shallow(<LoadMoreButton {...props} />)
}

function test () {
  expect(subject).toMatchSnapshot()
}

const element = {
  link: () => subject.find('a')
}

beforeEach(() => {
  props = {
    hasMore: true,
    onClick: jest.fn()
  }
  subject = null
})

describe('#render', () => {
  it('when there is more to load', () => {
    loadSubject()
    test()
  })

  it('when has more is false', () => {
    props.hasMore = false
    loadSubject()
    test()
  })

  it('on click', () => {
    loadSubject()
    element.link().prop('onClick')()
    test()
  })
})
