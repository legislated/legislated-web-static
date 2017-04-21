/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Content from '../content'

// subject
let subject
let bill
let relayConfig = Content.relayConfig()

function loadSubject () {
  subject = shallow(<Content bill={bill} />)
}

const element = {
  title: () => subject.find('h1'),
  number: () => subject.find('h4'),
  slipLink: () => subject.find('Link').at(0),
  detailsLink: () => subject.find('Link').at(1),
  textLink: () => subject.find('Link').at(2),
  summary: () => subject.find('Element').at(0),
  date: () => subject.find('Element').at(1),
  committee: () => subject.find('Element').at(2)
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  bill = {
    documentNumber: 'HB1234',
    title: 'Foo',
    summary: 'A bill, fantastic',
    witnessSlipUrl: 'http://www.test.com/slip',
    billDetailsUrl: 'http://www.test.com/details',
    fullTextUrl: 'http://www.test.com/text',
    hearing: {
      date: '2010-01-01T00:00:00-06:00'
    },
    committee: {
      name: 'Many Pointed Bills'
    }
  }
})

afterEach(() => {
  subject = null
})

describe('#render', () => {
  beforeEach(loadSubject)

  it('shows the title', () => {
    expect(element.title()).toHaveText(bill.title)
  })

  it('shows the document number', () => {
    expect(element.number()).toHaveText(bill.documentNumber)
  })

  it('shows the witness slip link', () => {
    expect(element.slipLink()).toHaveProp('to', bill.witnessSlipUrl)
  })

  it('shows the details link', () => {
    expect(element.detailsLink()).toHaveProp('to', bill.detailsUrl)
  })

  it('shows the full text link', () => {
    expect(element.textLink()).toHaveProp('to', bill.fullTextUrl)
  })

  it('shows the summary', () => {
    expect(element.summary()).toHaveProp('value', bill.summary)
  })

  it('shows the hearing date', () => {
    expect(element.date()).toHaveProp('value', '01/01/2010')
  })

  it('shows the committee name', () => {
    expect(element.committee()).toHaveProp('value', bill.committee.name)
  })
})

describe('#fragments', () => {
  it('has a bill', () => {
    expect(relayConfig.fragments.bill).toBeTruthy()
  })
})
