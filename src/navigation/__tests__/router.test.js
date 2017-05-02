/* eslint-env jest */
import { each } from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import { AppRouter, reset } from '../router'
import { set } from 'shared/storage'

// mocks
jest.mock('shared/storage', () => {
  return { set: jest.fn() }
})

// subject
let subject

function loadSubject () {
  subject = shallow(<AppRouter />)
}

const element = {
  root: () => subject.children('Route')
}

// spec
afterEach(() => {
  subject = null
})

describe('when the user navigates', () => {
  function visit (...paths) {
    const root = element.root()
    each(paths, (path) => {
      root.simulate('change', { location: { pathname: path } })
    })
  }

  beforeEach(reset)

  it('hides the intro when navigating away from search', () => {
    loadSubject()
    visit('/', '/faq')
    expect(set).toHaveBeenCalledWith('visited-intro', 'true')
  })

  it('does not hide the intro search was refreshed', () => {
    loadSubject()
    visit('/', '/')
    expect(set).not.toHaveBeenCalled()
  })

  it('does not hide the intro when search was not visited', () => {
    loadSubject()
    visit('/faq')
    expect(set).not.toHaveBeenCalled()
  })
})
