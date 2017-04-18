/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import BillLink from '../bill_link'

// subject
let subject
let url = ''
let label = ''
let iconName = ''

function loadSubject () {
  subject = shallow(<BillLink url={url} label={label} iconName={iconName} />)
}

const element = {
  icon: () => subject.find('FontAwesome')
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('links to the page', () => {
    url = 'http://www.google.com'
    loadSubject()
    expect(subject).toHaveProp('href', url)
  })

  it('shows the icon', () => {
    iconName = 'foo'
    loadSubject()
    expect(element.icon()).toHaveProp('name', iconName)
  })

  it('shows the label', () => {
    label = 'just, click it already'
    loadSubject()
    expect(subject.text()).toMatch(label)
  })

  describe(`when there's no url`, () => {
    it('returns null', () => {
      url = null
      loadSubject()
      expect(subject.get(0)).toBeNull()
    })
  })
})
