// @flow
import '../scenes/styles/globals'
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { StickyContainer, Sticky } from 'react-sticky'
import { Header } from './header'
import { fonts } from '../scenes/styles'

export class Container extends Component {
  props: {
    children?: any
  }

  render () {
    const { children } = this.props

    return <StickyContainer className={css(styles.container)}>
      <Sticky className={css(styles.header)}>
        <Header />
      </Sticky>
      <div className={css(styles.inner)}>
        {children}
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
