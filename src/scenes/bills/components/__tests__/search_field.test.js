/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import SearchField from '../search_field'

// subject
let subject
let onChange

function loadSubject () {
  onChange = jest.fn()
  subject = shallow(<SearchField value={'test value'} onChange={onChange} />)
}

const element = {
  field: () => subject.childAt(1),
  input: () => subject.find(`input[name='search-field']`),
  icon: () => subject.find('FontAwesome')
}

// specs
afterEach(() => {
  subject = null
})

describe('#state', () => {
  beforeEach(loadSubject)

  it('starts unfocused', () => {
    expect(subject).toHaveState('isFocused', false)
  })
})

describe('#render', () => {
  beforeEach(loadSubject)

  it(`sets in the input's value`, () => {
    expect(element.input()).toHaveValue('test value')
  })

  it('does not have the focused style', () => {
    expect(element.field()).not.toMatchClassName(/[fF]ocused/)
  })

  describe(`when it's focused`, () => {
    beforeEach(() => {
      subject.setState({ isFocused: true })
    })

    it('adds the style to the field', () => {
      expect(element.field()).toMatchClassName(/[fF]ocused/)
    })

    it('adds the style to the icon', () => {
      expect(element.icon()).toMatchClassName(/[fF]ocused/)
    })
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
    expect(onChange).toHaveBeenLastCalledWith('foo')
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
