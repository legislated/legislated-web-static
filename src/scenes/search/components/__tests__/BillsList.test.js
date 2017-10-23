/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { BillsList } from '../BillsList'
import { routerProps } from 'mocks/routerProps'
import { session } from 'shared/storage'
import { relayPaginationProp } from 'mocks/relayProps'

const { anything } = expect

// mocks
jest.mock('../../searchRoute', () => {
  const moment = require('moment')
  const constants = {
    count: 999,
    startDate: moment().month(4).date(1),
    endDate: moment().month(4).date(7)
  }

  return { constants }
})

let subject
let props

function loadSubject () {
  subject = shallow(<BillsList {...props} />).dive().dive()
}

function test () {
  expect(subject).toMatchSnapshot()
}

function edges (nodes) {
  return nodes.map((node) => ({ node }))
}

beforeEach(() => {
  props = {
    viewer: {
      bills: {
        edges: []
      }
    },

    animate: true
  }
  subject = null
})

describe('#componentWillMount', () => {
  it('disables animations on pop', () => {
    routerProps.history.action = 'POP'
    loadSubject()
    test()
  })
})

describe('#componentDidMount', () => {
  it('re-enables animations on pop', () => {
    routerProps.history.action = 'POP'
    loadSubject()
    subject.instance().componentDidMount()
    test()
  })
})

describe('#componentWillUnmount', () => {
  it('stores the visible bill count', () => {
    const bills = [{ id: 1 }, { id: 2 }, { id: 3 }]
    props.viewer.bills.edges = edges(bills)
    loadSubject()
    subject.unmount()
    test()
  })
})

describe('#render', () => {
  it('renders correctly', () => {
    loadSubject()
    test()
  })

  it('shows the total bill count', () => {
    props.viewer.bills.count = 2
    loadSubject()
    test()
  })

  it('shows a bill cell for every bill', () => {
    const bills = [{ id: 1 }, { id: 2 }]
    props.viewer.bills.edges = edges(bills)
    loadSubject()
    test()
  })

  it(`shows the load more button when there's another page`, () => {
    relayPaginationProp.hasMore.mockReturnValue(true)
    loadSubject()
    test()
  })
})

describe('on clicking load more', () => {
  it('when there is more to load', () => {
    relayPaginationProp.hasMore.mockReturnValue(true)
    loadSubject()
    subject.find('LoadMoreButton').simulate('click')
    test()
  })

  it('when there is no more to load', () => {
    relayPaginationProp.hasMore.mockReturnValue(false)
    loadSubject()
    subject.find('LoadMoreButton').simulate('click')
    test()
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(BillsList.container).toBeTruthy()
  })
})
