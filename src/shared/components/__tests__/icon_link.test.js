/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { IconLink } from '../icon_link'

// subject
let subject
let url = 'url'
let label = 'label'
let iconName = 'icon'

function loadSubject () {
  subject = shallow(<IconLink to={url} label={label} iconName={iconName} />)
}

const element = {
  icon: () => subject.find('FontAwesome'),
  label: () => subject.find('span')
}

// specs
afterEach(() => {
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

  describe('with missing data', () => {
    it('hides the label', () => {
      label = null
      loadSubject()
      expect(element.label()).toHaveLength(0)
    })
  })
})
