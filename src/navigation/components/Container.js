// @flow
import 'shared/styles/globals'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'
import { Header } from './Header'
import { NotificationView } from 'shared/components'
import { stylesheet, fonts, mobile } from 'shared/styles'
import { local } from 'shared/storage'

type ContainerProps = {
  children?: any
} & ContextRouter

let Container = class Container extends Component {
  props: ContainerProps

  componentDidUpdate (prevProps: ContainerProps) {
    // mark the intro as cleared if we've seen it and left the search scene
    const { pathname } = this.props.location
    if (local.get('intro-visited') && pathname !== '/') {
      local.set('intro-cleared', 'true')
    }
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

Container = withRouter(Container)

export { Container }
