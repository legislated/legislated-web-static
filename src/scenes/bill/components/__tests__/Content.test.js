/* eslint-env jest */
import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { Content } from '../Content'

let subject
let props

function loadSubject () {
  subject = shallow(<Content {...props} />).dive()
}

function test () {
  expect(subject).toMatchSnapshot()
}

const element = {
  title: () => subject.find('h1'),
  number: () => subject.find('h4'),
  summary: () => subject.find('Element').at(0),
  date: () => subject.find('Element span').at(0),
  actions: () => subject.find('Actions'),
  hoursLeft: () => subject.find('Element span').at(1),
  committee: () => subject.find('Element').at(2)
}

beforeEach(() => {
  props = {
      bill: {
      documentNumber: 'HB1234',
      title: 'Foo',
      summary: 'A bill, fantastic',
      hearing: {
        date: moment().add(11.9, 'hours').utc()
      },
      committee: {
        name: 'Many Pointed Bills'
      }
    }
  }
  subject = null
})

describe('#render', () => {
  it('normally', () => {
    loadSubject()
    test()
  })

  it('when the date is over 23 hours away', () => {
    props.bill.hearing.date = moment().add(24.1, 'hours').utc()
    loadSubject()
    test()
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(Content.container.fragment).toBeTruthy()
  })
})
