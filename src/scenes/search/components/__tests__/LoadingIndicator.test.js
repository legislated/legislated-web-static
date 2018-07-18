/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { LoadingIndicator } from '../LoadingIndicator'

let subject
let props

function loadSubject () {
  subject = shallow(<LoadingIndicator {...props} />)
}

function test () {
  expect(subject).toMatchSnapshot()
}

beforeEach(() => {
  props = {
    isLoading: false
  }
  subject = null
})

describe('#render', () => {
  it('when loading', () => {
    props.isLoading = true
    loadSubject()
    test()
  })

  it('when not loading', () => {
    loadSubject()
    test()
  })
})
