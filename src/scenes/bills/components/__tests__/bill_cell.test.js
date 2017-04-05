/* eslint-env jest */
import { assign } from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import BillCell from '../bill_cell'

// subject
let subject
let bill
let relayConfig = BillCell.relayConfig()

function loadSubject () {
  subject = shallow(<BillCell bill={bill} />)
}

const element = {
  doc: () => subject.find('span').at(0),
  title: () => subject.find('span').at(1),
  date: () => subject.find('span').at(2),
  link: () => subject.find('a'),
  summary: () => subject.children('div').at(2)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  beforeEach(() => {
    // TODO: add rosie.js factories
    bill = {
      documentNumber: 'HB1234',
      title: 'Foo',
      summary: 'A bill, fantastic',
      witnessSlipUrl: 'http://www.test.com',
      hearing: {
        date: '2010-01-01T00:00:00-06:00'
      }
    }
  })

  it('shows the document number', () => {
    loadSubject()
    expect(element.doc()).toHaveText(bill.documentNumber)
  })

  it('shows the title', () => {
    loadSubject()
    expect(element.title()).toHaveText(bill.title)
  })

  it('shows the hearing date', () => {
    loadSubject()
    expect(element.date()).toHaveText('01/01/2010')
  })

  it('shows the slip link', () => {
    loadSubject()
    expect(element.link()).toHaveProp('href', bill.witnessSlipUrl)
  })

  it('shows the summary', () => {
    loadSubject()
    expect(element.summary()).toHaveText(bill.summary)
  })

  describe('when data is missing', () => {
    beforeEach(() => {
      assign(bill, {
        summary: '',
        witnessSlipUrl: ''
      })
    })

    it('hides the slip link', () => {
      loadSubject()
      expect(element.link()).toBeEmpty()
    })

    it('hides the summary', () => {
      loadSubject()
      expect(element.summary().get(0)).toBeUndefined()
    })
  })
})

describe('#fragments', () => {
  it('has a bill', () => {
    expect(relayConfig.fragments.bill).toBeTruthy()
  })
})
