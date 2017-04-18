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
  slipLink: () => subject.find('BillLink').at(0),
  detailsLink: () => subject.find('BillLink').at(1),
  textLink: () => subject.find('BillLink').at(2),
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
      witnessSlipUrl: 'http://www.test.com/slip',
      billDetailsUrl: 'http://www.test.com/details',
      fullTextUrl: 'http://www.test.com/text',
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
    expect(element.slipLink()).toHaveProp('url', bill.witnessSlipUrl)
  })

  it('shows the details page link', () => {
    loadSubject()
    expect(element.detailsLink()).toHaveProp('url', bill.detailsUrl)
  })

  it('shows the full text page link', () => {
    loadSubject()
    expect(element.textLink()).toHaveProp('url', bill.fullTextUrl)
  })

  it('shows the summary', () => {
    loadSubject()
    expect(element.summary()).toHaveText(bill.summary)
  })

  describe('when data is missing', () => {
    beforeEach(() => {
      assign(bill, {
        summary: ''
      })
    })

    it('hides the summary', () => {
      loadSubject()
      expect(element.summary().get(0)).toBeFalsy()
    })
  })
})

describe('#fragments', () => {
  it('has a bill', () => {
    expect(relayConfig.fragments.bill).toBeTruthy()
  })
})
