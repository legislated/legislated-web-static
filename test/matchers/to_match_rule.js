import { findKey } from 'lodash'
import { glamorMatcher } from './glamor_matcher'

export const toMatchRule = glamorMatcher((wrapper) => {
  return findKey(wrapper.props(), (_, key) => {
    return key.startsWith('data-css')
  })
})
