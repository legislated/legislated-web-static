/* eslint-env jest */
import { assign } from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import { BillCell } from '../BillCell'

// subject
let subject
let bill

function loadSubject () {
  subject = shallow(<BillCell bill={bill} />).dive()
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('renders properly', () => {
    bill = {
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

    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('renders properly when data is missing', () => {
    assign(bill, {
      summary: ''
    })

    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
