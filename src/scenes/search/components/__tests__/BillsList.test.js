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

// subject
let subject

const defaultProps = {
  viewer: {
    bills: {
      edges: []
    }
  },

  animate: true
}

function loadSubject (props) {
  subject = shallow(<BillsList {...defaultProps} {...props} />).dive().dive()
}

function edges (nodes) {
  return nodes.map((node) => ({ node }))
}

afterEach(() => {
  subject = null
})

describe('#componentWillMount', () => {
  it('disables animations on pop', () => {
    routerProps.history.action = 'POP'
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('#componentDidMount', () => {
  it('re-enables animations on pop', () => {
    routerProps.history.action = 'POP'
    loadSubject()
    subject.instance().componentDidMount()
    expect(subject).toMatchSnapshot()
  })
})

describe('#componentWillUnmount', () => {
  it('stores the visible bill count', () => {
    const bills = [{ id: 1 }, { id: 2 }, { id: 3 }]
    loadSubject({viewer: {bills: {edges: edges(bills)}}})
    subject.unmount()
    expect(subject).toMatchSnapshot()
  })
})

describe('#render', () => {
  it('renders correctly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('shows the total bill count', () => {
    loadSubject({viewer: {bills: {edges: [], count: 2}}})
    expect(subject).toMatchSnapshot()
  })

  it('shows a bill cell for every bill', () => {
    const bills = [{ id: 1 }, { id: 2 }]
    loadSubject({viewer: {bills: {edges: edges(bills)}}})
    expect(subject).toMatchSnapshot()
  })

  it(`shows the load more button when there's another page`, () => {
    relayPaginationProp.hasMore.mockReturnValue(true)
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('on clicking load more', () => {
  it('when there is more to load', () => {
    relayPaginationProp.hasMore.mockReturnValue(true)
    loadSubject()
    subject.find('LoadMoreButton').simulate('click')
    expect(subject).toMatchSnapshot()
  })

  it('when there is no more to load', () => {
    relayPaginationProp.hasMore.mockReturnValue(false)
    loadSubject()
    subject.find('LoadMoreButton').simulate('click')
    expect(subject).toMatchSnapshot()
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(BillsList.container).toBeTruthy()
  })
})
