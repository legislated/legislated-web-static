/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { SearchField } from '../SearchField'

let subject
let props

function loadSubject () {
  subject = shallow(<SearchField {...props} />)
}

function test () {
  expect(subject).toMatchSnapshot()
}

const element = {
  field: () => subject.find('div > div').at(1),
  input: () => subject.find("input[name='search-field']"),
  icon: () => subject.find('FontAwesome')
}

beforeEach(() => {
  props = {
    value: 'test value',
    onChange: jest.fn()
  }
  subject = null
})

describe('#render', () => {
  it('renders correctly', () => {
    loadSubject()
    test()
  })

  it("when it is focused", () => {
    loadSubject()
    subject.setState({ isFocused: true })
    test()
  })
})

describe('when the value changes', () => {
  beforeEach(() => {
    loadSubject()
    subject.setState({ isFocused: true })
    const event = { target: { value: 'foo' } }
    element.input().prop('onChange')(event)
  })

  it('notifies its parent', () => {
    expect(props.onChange).toHaveBeenLastCalledWith('foo')
  })
})

describe('when the input is foucsed', () => {
  beforeEach(() => {
    loadSubject()
    element.input().prop('onFocus')()
  })

  it('focuses the component', () => {
    expect(subject).toHaveState('isFocused', true)
  })
})

describe('when the input is blurred', () => {
  beforeEach(() => {
    loadSubject()
    subject.setState({ isFocused: true })
    element.input().prop('onBlur')()
  })

  it('unfocuses the component', () => {
    expect(subject).toHaveState('isFocused', false)
  })
})
