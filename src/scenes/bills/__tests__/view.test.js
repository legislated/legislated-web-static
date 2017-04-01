// @flow
/* eslint-env jest */
import moment from 'moment'
import BillsView from '../view'

// subject
let relayConfig

beforeEach(() => {
  relayConfig = BillsView.relayConfig
})

// specs
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
