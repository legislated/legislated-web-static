/* eslint-env jest */
import { assign } from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import { BillCell } from '../BillCell'

let subject
let props

function loadSubject () {
  subject = shallow(<BillCell {...props} />).dive()
}

function test () {
  expect(subject).toMatchSnapshot()
}

beforeEach(() => {
  props = {
    bill: {
      documentNumber: 'HB1234',
      title: 'Foo',
      summary: 'A bill, fantastic',
      witnessSlipUrl: 'http://www.test.com/slip',
      billDetailsUrl: 'http://www.test.com/details',
      fullTextUrl: 'http://www.test.com/text',
      hearing: {
        date: '2010-01-01T00:00:00-06:00'
      }
    }
  }
  subject = null
})

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    test()
  })

  it('renders properly when data is missing', () => {
    props.bill.summary = null
    loadSubject()
    test()
  })
})
