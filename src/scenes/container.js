// @flow
import './styles/globals'
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { fonts } from './styles'
import { AppRouter } from './router'

export default class Container extends Component {
  props: {
    children?: any
  }

  render () {
    return <div className={css(styles.container)}>
      <div className={css(styles.inner)}>
        <AppRouter />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    ...fonts.regular,
    height: '100vh'
  },
  inner: {
    padding: 30
  }
})
