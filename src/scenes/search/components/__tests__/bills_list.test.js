/* eslint-env jest */
import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { BillsList } from '../bills_list'

// subject
let subject
let connection
let onLoadMore
let start = moment()
let end = moment()
let relayConfig = BillsList.relayConfig()

function loadSubject () {
  subject = shallow(<BillsList
    bills={connection}
    startDate={start}
    endDate={end}
    onLoadMore={onLoadMore} />)
}

const element = {
  bills: () => subject.find('Cell'),
  date: () => subject.find('div > div > div').at(0),
  count: () => subject.find('div > div > div').at(1),
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
  it('shows the start date', () => {
    start = moment().month(4).date(1)
    end = moment().month(4).date(7)
    loadSubject()
    expect(element.date()).toHaveText('May 1st to May 7th')
  })

  it('shows the total bill count', () => {
    connection.count = 2
    loadSubject()
    expect(element.count()).toIncludeText('2')
  })

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
