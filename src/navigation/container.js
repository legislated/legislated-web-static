// @flow
import 'shared/styles/globals'
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { StickyContainer, Sticky } from 'react-sticky'
import { Header } from './header'
import { MobileNav } from './mobile_nav'
import { fonts, utils } from 'shared/styles'

export class Container extends Component {
  props: {
    children?: any
  }

  render () {
    const { children } = this.props

    return <StickyContainer id='container' className={css(styles.container)}>
      <Sticky className={css(styles.header)}>
        <Header />
      </Sticky>
      <MobileNav />
      <div id='content' className={css(styles.content)}>
        {children}
      </div>
    </StickyContainer>
  }
}

const styles = StyleSheet.create({
  container: {
    ...fonts.regular
  },
  content: {
    padding: 30,
    ...utils.mobile({
      padding: 15
    })
  },
  header: {
    zIndex: 1
  }
})
