// @flow
import { each } from 'lodash'
import { css } from 'glamor'
import { fonts } from './fonts'
import { query } from './mobile'

function globals (definitions) {
  each(definitions, (definition, selector) => {
    css.global(selector, definition)
  })
}

globals({
  'p, h1, h2, h3, h4, h5, h6, ul': {
    margin: 0
  },
  h1: {
    fontSize: 28
  },
  h3: {
    fontSize: 20
  },
  h4: {
    ...fonts.regular,
    fontSize: 20
  }
})

// hack around the fact that glamor doesn't parse media queries out of
// css.global properly
const globalQuery = `${query} {
  h1 { font-size: 24px; }
  h3, h4 { font-size: 18px; }
}`

css.insert(globalQuery)
