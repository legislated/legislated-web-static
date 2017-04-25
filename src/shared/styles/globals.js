import { StyleSheet } from 'aphrodite/no-important'
import { fonts } from './fonts'
import { utils } from './utils'

const GLOBALS = '__GLOBAL_STYLES__'

const extension = StyleSheet.extend([{
  selectorHandler (selector, baseSelector, generateSubtreeStyles) {
    return baseSelector.includes(GLOBALS) ? generateSubtreeStyles(selector) : null
  }
}])

const styles = extension.StyleSheet.create({
  [GLOBALS]: {
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
})

export default extension.css(styles[GLOBALS])
