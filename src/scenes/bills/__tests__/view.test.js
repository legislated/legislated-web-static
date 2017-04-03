/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import BillsView from '../view'

const pageSize = 25

// subject
let subject
let viewer
let relayProp
let relayConfig

function loadSubject () {
  relayProp = {
    variables: relayConfig.initialVariables,
    setVariables: jest.fn()
  }

  subject = shallow(<BillsView viewer={viewer} relay={relayProp} />)
}

const element = {
  bills: () => subject.find('BillCell'),
  searchField: () => subject.find('SearchField'),
  loadButton: () => subject.find('LoadMoreButton')
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  viewer = {
    bills: {
      edges: [],
      pageInfo: {
        hasNextPage: true
      }
    }
  }

  relayConfig = BillsView.relayConfig()
})

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
      const cells = element.bills()
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
      expect(element.searchField()).toHaveValue(query)
    })
  })

  describe('the load more button', () => {
    beforeEach(loadSubject)

    it('has more if there is another page', () => {
      const { hasNextPage } = viewer.bills.pageInfo
      expect(element.loadButton()).toHaveProp('hasMore', hasNextPage)
    })
  })
})

describe('on search field change', () => {
  let onChange

  beforeEach(() => {
    loadSubject()
    onChange = element.searchField().prop('onChange')
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

describe('on clicking load more', () => {
  beforeEach(() => {
    loadSubject()
    element.loadButton().prop('onClick')()
  })

  it('fetches the next page', () => {
    expect(relayProp.setVariables).toHaveBeenLastCalledWith({ first: pageSize * 2 })
  })
})

describe('#initialVariables', () => {
  it('fetches the page size', () => {
    expect(relayConfig.initialVariables.first).toEqual(pageSize)
  })
})

describe('#prepareVariables', () => {
  let previous = { query: 'foo', first: 5 }
  let variables

  beforeEach(() => {
    variables = relayConfig.prepareVariables(previous)
  })

  it('propogates the query', () => {
    expect(variables.query).toEqual(previous.query)
  })

  it('propogates the first count', () => {
    expect(variables.first).toEqual(previous.first)
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
