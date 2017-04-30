/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { BillsScene } from '../scene'

const pageSize = 25

// subject
let subject
let viewer
let relayProp
let relayConfig = BillsScene.relayConfig()

function loadSubject () {
  relayProp = {
    variables: relayConfig.initialVariables,
    setVariables: jest.fn()
  }

  subject = shallow(<BillsScene viewer={viewer} relay={relayProp} />)
}

const element = {
  list: () => subject.find('List'),
  searchField: () => subject.find('SearchField'),
  indicator: () => subject.find('LoadingIndicator')
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
})

afterEach(() => {
  subject = null
})

describe('#state', () => {
  beforeEach(loadSubject)

  it('starts with an empty query', () => {
    expect(subject).toHaveState('query', '')
  })
})

describe('#render', () => {
  it('shows the bills list', () => {
    loadSubject()
    const list = element.list()
    expect(list).toBePresent()
    expect(list).toHaveProp('bills', viewer.bills)
  })

  it('hides the loading indicator', () => {
    loadSubject()
    expect(element.indicator()).toHaveProp('isLoading', false)
  })

  it('shows the search field with the current query', () => {
    loadSubject()
    subject.setState({ query: 'foo' })
    expect(element.searchField()).toHaveValue('foo')
  })

  describe('when loading', () => {
    beforeEach(() => {
      viewer = null
      loadSubject()
    })

    it('shows the loading indicator', () => {
      expect(element.indicator()).toHaveProp('isLoading', true)
    })

    it('hides the bills list', () => {
      expect(element.list()).toBeEmpty()
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
    expect(relayProp.setVariables).toHaveBeenLastCalledWith({ query: 'bar' }, expect.anything())
  })
})

describe('on clicking load more', () => {
  it('fetches the next page', () => {
    loadSubject()
    element.list().simulate('loadMore')
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
