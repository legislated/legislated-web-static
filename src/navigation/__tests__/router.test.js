/* eslint-env jest */
import { each } from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import { AppRouter, reset } from '../router'
import { local } from 'shared/storage'

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
  const key = '@@legislated/intro-visited'

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
    expect(local.get(key)).toEqual('true')
  })

  it('does not hide the intro search was refreshed', () => {
    loadSubject()
    visit('/', '/')
    expect(local.get(key)).toBeUndefined()
  })

  it('does not hide the intro when search was not visited', () => {
    loadSubject()
    visit('/faq')
    expect(local.get(key)).toBeUndefined()
  })
})
