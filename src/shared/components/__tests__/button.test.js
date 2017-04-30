/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '../button'

// subject
let subject
let url = 'url'
let type
let label
let iconName

function loadSubject () {
  subject = shallow(<Button to={url} type={type} label={label} iconName={iconName} />)
}

let element = {
  link: () => subject.find('Link'),
  icon: () => subject.find('FontAwesome'),
  label: () => subject.find('span')
}

// spec
beforeEach(() => {
  url = 'url'
})

afterEach(() => {
  type = null
  subject = null
})

describe('#render', () => {
  it('shows the icon', () => {
    iconName = 'foo'
    loadSubject()
    expect(element.icon()).toHaveProp('name', iconName)
  })

  it('shows the label', () => {
    label = 'just, click it already'
    loadSubject()
    expect(element.label()).toHaveText(label)
  })

  describe('when the type is outline', () => {
    it('does not style the link as solid', () => {
      type = 'outline'
      loadSubject()
      expect(element.link()).toMatchStyles('1scp0ws')
    })
  })

  describe('when the type is solid', () => {
    it('styles the button as solid', () => {
      type = 'solid'
      loadSubject()
      expect(element.link()).toMatchStyles('t09yh6')
    })
  })
})
