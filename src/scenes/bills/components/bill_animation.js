// @flow
import React, { Component } from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { StyleSheet, css } from 'aphrodite/no-important'

const translation = 50
const duration = 450

export default class BillAnimation extends Component {
  props: {
    disable?: boolean,
    disableAppear?: boolean,
    children?: any
  }

  render () {
    const { disable, disableAppear } = this.props

    const name = {
      enter: css(styles.enter),
      enterActive: css(styles.enterActive),
      appear: css(styles.enter),
      appearActive: css(styles.enterActive),
      leave: css(styles.leave),
      leaveActive: css(styles.leaveActive)
    }

    return <TransitionGroup
      transitionName={name}
      transitionAppear={!disable && !disableAppear}
      transitionEnter={!disable}
      transitionLeave={!disable}
      transitionAppearTimeout={duration}
      transitionEnterTimeout={duration}
      transitionLeaveTimeout={duration}
    >
      {this.props.children}
    </TransitionGroup>
  }
}

const styles = StyleSheet.create({
  bill: {
    transition: `opacity ${duration}ms, transform ${duration}ms`
  },
  enter: {
    opacity: 0.01,
    transform: `translateY(${translation}px)`
  },
  enterActive: {
    opacity: 1.0,
    transform: 'none'
  },
  leave: {
    opacity: 1.0
  },
  leaveActive: {
    opacity: 0.1
  }
})

export const billStyle = styles.bill
