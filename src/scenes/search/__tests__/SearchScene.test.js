/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchScene } from '../SearchScene'
import { relayRefetchProp } from 'mocks/relayProps'

const { anything } = expect

let subject
let props

function loadSubject () {
  subject = shallow(<SearchScene {...props} />).dive().dive()
}

function test () {
  expect(subject).toMatchSnapshot()
}

beforeEach(() => {
  props = {
    viewer: {
      bills: {
        edges: []
      }
    }
  }
  subject = null
})

describe('#render', () => {
  it('normally', () => {
    loadSubject()
    test()
  })

  it('with query', () => {
    loadSubject()
    subject.setState({ query: 'foo' })
    test()
  })

  it('renders properly when loading', () => {
    props.viewer = null
    loadSubject()
    test()
  })
})

describe('on search field change', () => {
  it('updates the visible query', () => {
    loadSubject()
    subject.find('SearchField').simulate('change', 'foo')
    expect(relayRefetchProp.refetch).toHaveBeenLastCalledWith({ query: 'foo' }, null, anything())
  })
})
