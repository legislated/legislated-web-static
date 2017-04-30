import { findKey } from 'lodash'
import { glamorMatcher } from './glamor_matcher'

export const toMatchStyles = glamorMatcher((wrapper) => {
  return findKey(wrapper.prop('styles'), (_, key) => {
    return key.startsWith('data-css')
  })
})
