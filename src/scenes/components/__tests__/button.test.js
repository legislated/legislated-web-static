/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '../button'

// subject
let subject
let url
let type

function loadSubject () {
  subject = shallow(<Button to={url} type={type} />)
}

let element = {
  link: () => subject.find('Link')
}

// spec
beforeEach(() => {
  url = 'url'
})

afterEach(() => {
  type = null
  subject = null
})

describe('#render', () => {
  describe('with no url', () => {
    it('shows nothing', () => {
      url = null
      loadSubject()
      expect(subject.get(0)).toBeFalsy()
    })
  })

  describe('when the type is outline', () => {
    beforeEach(() => {
      type = 'outline'
      loadSubject()
    })

    it('does not style the button as solid', () => {
      loadSubject()
      expect(subject).not.toMatchClassName('solid')
    })

    it('does not style the link as solid', () => {
      // TODO: this could be better, glamor?
      loadSubject()
      expect(element.link().prop('style')[1]).toEqual({})
    })
  })

  describe('when the type is solid', () => {
    beforeEach(() => {
      type = 'solid'
      loadSubject()
    })

    it('styles the button as solid', () => {
      loadSubject()
      expect(subject).toMatchClassName('solid')
    })

    it('styles the link as solid', () => {
      // TODO: this could be better, glamor?
      loadSubject()
      expect(element.link().prop('style')[1]).not.toEqual({})
    })
  })
})
