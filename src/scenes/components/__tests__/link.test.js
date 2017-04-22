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
  subject = shallow(<Link to={url} label={label} iconName={iconName} />)
}

const element = {
  anchor: () => subject.dive().find('a'),
  link: () => subject.dive().find('Link')
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows external links as an anchor', () => {
    url = 'http://www.google.com'
    loadSubject()
    expect(element.anchor()).toHaveProp('href', url)
  })

  it('shows relative links as a route link', () => {
    url = 'bills'
    loadSubject()
    expect(element.link()).toHaveProp('to', url)
  })

  describe('with no url', () => {
    it('shows nothing', () => {
      url = null
      loadSubject()
      expect(subject.get(0)).toBeFalsy()
    })
  })
})
