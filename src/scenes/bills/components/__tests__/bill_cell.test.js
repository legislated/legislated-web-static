/* eslint-env jest */
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
  doc: () => subject.find('span').first(),
  title: () => subject.find('span').last(),
  date: () => subject.find('div').last()
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  beforeEach(() => {
    // TODO: add rosie.js factories
    bill = { documentNumber: 'HB1234', title: 'Foo', hearing: { date: '2010-01-01T00:00:00-06:00' } }
    loadSubject()
  })

  it('shows the document number', () => {
    expect(element.doc()).toHaveText(bill.documentNumber)
  })

  it('shows the title', () => {
    expect(element.title()).toHaveText(bill.title)
  })

  it('shows the hearing date', () => {
    expect(element.date()).toHaveText('01/01/2010')
  })
})

describe('#fragments', () => {
  it('has a bill', () => {
    expect(relayConfig.fragments.bill).toBeTruthy()
  })
})
