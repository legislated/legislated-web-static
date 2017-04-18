/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Link } from '../link'

// subject
let subject
let url = 'url'
let label = 'label'
let iconName = 'icon'

function loadSubject () {
  subject = shallow(<Link url={url} label={label} iconName={iconName} />)
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

  describe('with no url', () => {
    it('returns null', () => {
      url = null
      loadSubject()
      expect(subject.get(0)).toBeNull()
    })
  })

  describe('with missing data', () => {
    it('hides the label', () => {
      label = null
      loadSubject()
      expect(subject.text()).toBeEmpty()
    })
  })
})
