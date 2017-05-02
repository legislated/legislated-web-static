// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import type { Rule } from 'glamor' // eslint-disable-line
import { BillAnimation } from './bill_animation'
import { Link } from 'shared/components'
import { get, set } from 'shared/storage'
import { stylesheet, borders, fonts } from 'shared/styles'

export class Intro extends Component {
  props: {
    styles?: Rule
  }

  state = {
    isAccepted: false
  }

  // events
  didClickAccept = () => {
    this.setState({ isAccepted: true }, () => {
      set('visited-intro', 'true')
    })
  }

  // lifecycle
  render () {
    const isVisited = get('visited-intro') !== null
    return isVisited ? null : <BillAnimation>{this.renderContent()}</BillAnimation>
  }

  renderContent (): ?React$Element<*> {
    if (this.state.isAccepted) {
      return null
    }

    const { styles } = this.props

    return <div {...css(rules.intro, styles)}>
      <h1>Hey, welcome to Legislated!</h1>
      <p>
        Our mission is to make it as simple as possible for residents of
        Illinois to impact our state government. We want you to be more engaged
        on the issues you care about, more connected to the lawmakers who impact
        them, and less tangled up in by the spider's web of info out there.
      </p>
      <p>
        Never heard of a witness slip? It's a tool the state provides us
        residents of Illinois to voice our opinions on the bills they write.
        Search for a bill you care about and let the legislature know what your
        stance is.
      </p>
      <div {...rules.action}>
        <span>
          Want to learn More? <Link to='/faq'>Visit our FAQs</Link>
        </span>
        <Link styles={rules.accept} onClick={this.didClickAccept}>
          <FontAwesome name='check' />
          <span>Got it.</span>
        </Link>
      </div>
    </div>
  }
}

const rules = stylesheet({
  intro: {
    ...borders.low(['bottom']),
    fontSize: 18,
    paddingBottom: 30,
    '> h1': {
      marginBottom: 20
    },
    '> p + p': {
      marginTop: 10
    }
  },
  action: {
    marginTop: 20,
    '> span:first-child': {
      ...fonts.bold,
      fontSize: 20
    }
  },
  accept: {
    ...borders.low(['left']),
    marginLeft: 10,
    paddingLeft: 10,
    '> *:last-child': {
      marginLeft: 5
    }
  }
})
