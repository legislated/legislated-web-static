// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import fonts from './fonts'
import colors from './colors'
import { AppRouter } from './router'

export default class Container extends Component {
  props: {
    children?: any
  }

  render () {
    return <div className={css(styles.container)}>
      <AppRouter />
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    ...fonts.regular,
    padding: 30,
    backgroundColor: colors.lightestGray
  }
})
