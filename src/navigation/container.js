// @flow
import 'shared/styles/globals'
import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { css } from 'glamor'
import { Header } from './header'
import { MobileNav } from './mobile_nav'
import { on, off } from 'shared/dispatcher'
import { fonts, utils } from 'shared/styles'

export class Container extends Component {
  props: {
    children?: any
  }

  state = {
    menuOpen: false
  }

  // events
  didOpenMenu = () => {
    this.setState({ menuOpen: true })
  }

  didCloseMenu = () => {
    this.setState({ menuOpen: false })
  }

  // lifecycle
  componentWillMount () {
    on('open-menu', this.didOpenMenu)
    on('close-menu', this.didCloseMenu)
  }

  componentWillUnmount () {
    off('open-menu', this.didOpenMenu)
    off('close-menu', this.didCloseMenu)
  }

  render () {
    const { menuOpen } = this.state
    const { children } = this.props

    return <StickyContainer id='container' {...rules.container}>
      <Sticky {...rules.header}>
        <Header menuOpen={menuOpen} />
      </Sticky>
      <MobileNav isOpen={menuOpen} />
      <div id='content' {...rules.content}>
        {children}
      </div>
    </StickyContainer>
  }
}

const rules = {
  container: css({
    ...fonts.regular
  }),
  content: css({
    padding: 30,
    ...utils.mobile({
      padding: 15
    })
  }),
  header: css({
    zIndex: 1
  })
}
