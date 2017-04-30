// @flow
import { each } from 'lodash'
import { insertGlobal } from 'glamor'
import { fonts } from './fonts'
import { utils } from './utils'

const globals = {
  'p, h1, h2, h3, h4, h5, h6, ul': {
    margin: 0
  },
  h1: {
    fontSize: 28,
    ...utils.mobile({
      fontSize: 24
    })
  },
  h3: {
    fontSize: 20,
    ...utils.mobile({
      fontSize: 18
    })
  },
  h4: {
    ...fonts.regular,
    fontSize: 20,
    ...utils.mobile({
      fontSize: 18
    })
  }
}

each(globals, (definition, selector) => {
  insertGlobal(selector, definition)
})
