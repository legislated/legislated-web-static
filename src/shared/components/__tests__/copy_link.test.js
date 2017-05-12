/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { CopyLink } from '../copy_link'

// subject
let subject
let value

function loadSubject () {
  subject = shallow(<CopyLink value={value} />)
}

const element = {
  clipboard: () => subject.find('CopyToClipboard')
}

// spec
afterEach(() => {
  subject = null
})

describe('on click', () => {
  it('copies the value', () => {
    value = 'http://fake.url/'
    loadSubject()
    expect(element.clipboard()).toHaveProp('text', value)
  })
})
