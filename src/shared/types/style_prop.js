// @flow
import { isEmpty } from 'lodash'

export type StyleProp = Object | Array<Object>

export function combine (prop: ?StyleProp): Array<Object> {
  if (!prop || isEmpty(prop)) {
    return []
  } else if (Array.isArray(prop)) {
    return prop.filter((o) => !isEmpty(o))
  } else {
    return [prop]
  }
}
