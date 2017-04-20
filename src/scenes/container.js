// @flow
import './styles/globals'
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { StickyContainer, Sticky } from 'react-sticky'
import { fonts } from './styles'
import { Header } from './header'
import { AppRouter } from './router'

export default class Container extends Component {
  props: {
    children?: any
  }

  render () {
    return <StickyContainer className={css(styles.container)}>
      <Sticky className={css(styles.header)}>
        <Header />
      </Sticky>
      <div className={css(styles.inner)}>
        <AppRouter />
      </div>
    </StickyContainer>
  }
}

const styles = StyleSheet.create({
  container: {
    ...fonts.regular
  },
  inner: {
    padding: 30
  },
  header: {
    zIndex: 1
  }
})
