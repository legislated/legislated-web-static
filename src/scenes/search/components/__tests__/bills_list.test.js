/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { BillsList } from '../bills_list'

// subject
let subject
let connection
let onLoadMore
let relayConfig = BillsList.relayConfig()

function loadSubject () {
  subject = shallow(<BillsList bills={connection} onLoadMore={onLoadMore} />)
}

const element = {
  bills: () => subject.find('Cell'),
  loadButton: () => subject.find('LoadMoreButton')
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  connection = {
    edges: [],
    pageInfo: {
      hasNextPage: true
    }
  }

  onLoadMore = jest.fn()
})

afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows a bill cell for every bill', () => {
    const bills = [{ id: 1 }, { id: 2 }]
    connection.edges = bills.map((b) => ({ node: b }))
    loadSubject()

    const cells = element.bills()
    expect(cells.length).toEqual(bills.length)
    expect(cells.map((c) => c.prop('bill'))).toEqual(bills)
  })

  it(`shows the load more button when there's another page`, () => {
    loadSubject()
    const { hasNextPage } = connection.pageInfo
    expect(element.loadButton()).toHaveProp('hasMore', hasNextPage)
  })
})

describe('on clicking load more', () => {
  it('notifies its parent', () => {
    loadSubject()
    element.loadButton().simulate('click')
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })
})

describe('#fragments', () => {
  it('has a bills connection', () => {
    expect(relayConfig.fragments.bills).toBeTruthy()
  })
})
