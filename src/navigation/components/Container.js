// @flow
import 'shared/styles/globals'
import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { Header } from './Header'
import { NotificationView } from 'shared/components'
import { stylesheet, fonts, mobile } from 'shared/styles'

export class Container extends Component {
  props: {
    children?: any
  }

  render () {
    const { children } = this.props

    return <StickyContainer id='container' {...rules.container}>
      <Sticky {...rules.header}>
        <Header />
      </Sticky>
      <div id='content' {...rules.content}>
        {children}
        <NotificationView />
      </div>
    </StickyContainer>
  }
}

const rules = stylesheet({
  container: {
    ...fonts.regular,
    position: 'relative',
    minHeight: '100vh'
  },
  content: {
    padding: 30,
    ...mobile({
      padding: 15,
      paddingBottom: 20
    })
  },
  header: {
    zIndex: 1
  }
})
