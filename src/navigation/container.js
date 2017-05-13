// @flow
import 'shared/styles/globals'
import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { Header } from './header'
import { stylesheet, fonts, mobile } from 'shared/styles'
import {Helmet} from "react-helmet"


export class Container extends Component {
  props: {
    children?: any
  }

  render () {
    const { children } = this.props

    return <StickyContainer id='container' {...rules.container}>
      <Helmet>
        <meta name="description" content="Your seat in the state capitol" />
        <meta name="og:url" content="https://legislated.org/" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Legislated" />
        <meta name="og:title" content="Legislated" />
        <meta name="og:description" content="Your seat in the state capitol" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@WitnessSlipsIL" />
        <meta name="twitter:title" content="Legislated" />
        <meta name="twitter:description" content="Your seat in the state capitol" />
      </Helmet>
      <Sticky {...rules.header}>
        <Header />
      </Sticky>
      <div id='content' {...rules.content}>
        {children}
      </div>
    </StickyContainer>
  }
}

const rules = stylesheet({
  container: {
    ...fonts.regular
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
