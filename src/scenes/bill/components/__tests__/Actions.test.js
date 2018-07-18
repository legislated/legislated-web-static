/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Actions } from '../Actions'

let subject
let props

function loadSubject () {
  subject = shallow(<Actions {...props} />).dive()
}

const element = {
  slipLink: () => subject.find('Button').at(0),
  slipResultLink: () => subject.find('Button').at(1),
  detailsLink: () => subject.find('Button').at(2),
  textLink: () => subject.find('Button').at(3)
}

beforeEach(() => {
  // TODO: build rosie.js factories
  props = {
    bill: {
      witnessSlipUrl: 'http://www.test.com/slip',
      witnessSlipResultUrl: 'http://www.test.com/result',
      billDetailsUrl: 'http://www.test.com/details',
      fullTextUrl: 'http://www.test.com/text'
    }
  }
  subject = null
})

describe('#render', () => {
  it('normally', () => {
    loadSubject()
    test()
  })
})

describe('the relay container', () => {
  it('has a bill', () => {
    expect(Actions.container.fragment).toBeTruthy()
  })
})
