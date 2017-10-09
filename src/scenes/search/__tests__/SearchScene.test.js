/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchScene } from '../SearchScene'
import { relayRefetchProp } from 'mocks/relayProps'

const { anything } = expect

// subject
let subject

const defaultProps = {
  viewer: {
    bills: {
      edges: []
    }
  }
}

function loadSubject (props) {
  subject = shallow(<SearchScene {...defaultProps} {...props} />).dive().dive()
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('renders properly with query', () => {
    loadSubject()
    subject.setState({ query: 'foo' })
    expect(subject).toMatchSnapshot()
  })

  it('renders properly when loading', () => {
    loadSubject({ viewer: null })
    expect(subject).toMatchSnapshot()
  })
})

describe('on search field change', () => {
  it('updates the visible query', () => {
    loadSubject()
    subject.find('SearchField').simulate('change', 'foo')
    expect(subject).toMatchSnapshot()
    expect(relayRefetchProp.refetch).toHaveBeenLastCalledWith({ query: 'foo' }, null, anything())
  })
})
