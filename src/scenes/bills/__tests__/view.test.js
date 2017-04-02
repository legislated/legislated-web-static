/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import BillsView from '../view'

// subject
let subject
let viewer
let relayProp
let relayConfig

function loadSubject () {
  relayProp = { setVariables: jest.fn() }
  subject = shallow(<BillsView viewer={viewer} relay={relayProp} />)
}

beforeEach(() => {
  viewer = { bills: { edges: [] } }
  relayConfig = BillsView.relayConfig()
})

// specs
describe('#state', () => {
  beforeEach(loadSubject)

  it('starts with an empty query', () => {
    expect(subject).toHaveState('query', '')
  })
})

describe('#render', () => {
  describe('each bill cell', () => {
    let bills

    beforeEach(() => {
      bills = [{ id: 1 }, { id: 2 }]
      viewer.bills.edges = bills.map((b) => ({ node: b }))
      loadSubject()
    })

    it('matches a bill', () => {
      const cells = subject.find('BillCell')
      expect(cells.length).toEqual(bills.length)
      expect(cells.map((c) => c.prop('bill'))).toEqual(bills)
    })
  })

  describe('the search field', () => {
    let query

    beforeEach(() => {
      loadSubject()
      query = 'foo'
      subject.setState({ query })
    })

    it('shows a search field with the query', () => {
      const field = subject.find('SearchField')
      expect(field).toHaveProp('value', query)
    })
  })
})

describe('on search field change', () => {
  let onChange

  beforeEach(() => {
    loadSubject()
    onChange = subject.find('SearchField').prop('onChange')
  })

  it('updates the state', () => {
    onChange('foo')
    expect(subject).toHaveState('query', 'foo')
  })

  it('updates the query variables', () => {
    onChange('bar')
    expect(relayProp.setVariables).toHaveBeenLastCalledWith({ query: 'bar' })
  })
})

describe('#prepareVariables', () => {
  let previous = { query: 'foo' }
  let variables

  beforeEach(() => {
    variables = relayConfig.prepareVariables(previous)
  })

  it('propogates the query', () => {
    expect(variables.query).toEqual(previous.query)
  })

  it('sets the date range to this week', () => {
    expect(variables.startDate).toEqual(moment().startOf('day'))
    expect(variables.endDate).toEqual(moment().add(6, 'days').endOf('day'))
  })
})

describe('#fragments', () => {
  it('has a viewer', () => {
    expect(relayConfig.fragments.viewer).toBeTruthy()
  })
})
