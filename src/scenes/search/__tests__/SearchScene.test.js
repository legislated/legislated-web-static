/* eslint-env jest */
import React from 'react'
import moment from 'moment'
import { shallow, mount } from 'enzyme'
import { SearchScene } from '../SearchScene'
import { session } from 'shared/storage'

const pageSize = 25
const { anything } = expect

// subject
let subject
let viewer
let location

function loadSubject (options = { mount: false }) {
  const renderer = options.mount ? mount : (component) => shallow(component).dive().dive()
  subject = renderer(<SearchScene viewer={viewer} />)
}

const element = {
  list: () => subject.find('BillsList'),
  searchField: () => subject.find('SearchField'),
  indicator: () => subject.find('LoadingIndicator')
}

// specs
beforeEach(() => {
  location = {}

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

describe('when navigating away', () => {
  it('saves the number of fetched bills', () => {
    loadSubject()
    subject.unmount()
    expect(session.get('@@legislated/last-search-count')).toEqual(`${pageSize}`)
  })
})

describe('when navigating to search', () => {
  const count = pageSize * 2

  beforeEach(() => {
    session.set('@@legislated/last-search-count', `${count}`)
  })

  it('restores the query on back', () => {
    location.action = 'POP'
    loadSubject({ mount: true })
    expect(relayProp.setVariables).toHaveBeenLastCalledWith({ first: count }, anything())
  })

  it('does not restore the query on push', () => {
    location.action = 'PUSH'
    loadSubject({ mount: true })
    expect(relayProp.setVariables).not.toHaveBeenCalled()
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

xdescribe('#initialVariables', () => {
  it('fetches the page size', () => {
    // expect(relayConfig.initialVariables.first).toEqual(pageSize)
  })
})

xdescribe('#prepareVariables', () => {
  let previous = { query: 'foo', first: 5 }
  let variables

  beforeEach(() => {
    // variables = relayConfig.prepareVariables(previous)
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
    expect(SearchScene.container.fragment).toBeTruthy()
  })
})
