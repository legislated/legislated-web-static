/* eslint-env jest */
import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { Content } from '../content'

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
  slipLink: () => subject.find('Button').at(0),
  detailsLink: () => subject.find('Button').at(1),
  textLink: () => subject.find('Button').at(2),
  summary: () => subject.find('Element').at(0),
  date: () => subject.find('Element span').at(0),
  hoursLeft: () => subject.find('Element span').at(1),
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
      date: moment().add(11.9, 'hours').utc()
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
  describe('nomrally', () => {
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
      expect(element.summary()).toHaveProp('children', bill.summary)
    })

    it('shows the hearing date', () => {
      expect(element.date()).toHaveText(moment(bill.hearing.date).calendar())
    })

    it('shows the hours left', () => {
      expect(element.hoursLeft()).toHaveText('(11 hours left)')
    })

    it('shows the committee name', () => {
      expect(element.committee()).toHaveProp('children', bill.committee.name)
    })
  })

  describe('when the date is over 23 hours away', () => {
    it('does not show the hours left', () => {
      bill.hearing.date = moment().add(24.1, 'hours').utc()
      loadSubject()
      expect(element.hoursLeft().get(0)).toBeFalsy()
    })
  })
})

describe('#fragments', () => {
  it('has a bill', () => {
    expect(relayConfig.fragments.bill).toBeTruthy()
  })
})
