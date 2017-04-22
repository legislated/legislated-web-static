// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import BillAnimation, { billStyle } from './bill_animation'
import { colors, shadows, borders } from 'shared/styles'

export default class LoadingIndicator extends Component {
  props: {
    isLoading: boolean
  }

  // lifecycle
  render () {
    return <BillAnimation disableAppear>
      {this.renderIndicator()}
    </BillAnimation>
  }

  renderIndicator (): ?React$Element<*> {
    if (!this.props.isLoading) {
      return null
    }

    return <div key='indicator' className={css(styles.container, billStyle)}>
      <div className={css(styles.topBar)} />
      <div className={css(styles.bottomBar)} />
    </div>
  }
}

function animation (start: string, end: string, duration: number): Object {
  return {
    animationName: [{ from: { width: start }, to: { width: end } }],
    animationDuration: `${duration}s`,
    animationDirection: 'alternate',
    animationIterationCount: 'infinite'
  }
}

const bar = {
  height: 22,
  borderRadius: 3,
  backgroundColor: colors.neutralShadow
}

const styles = StyleSheet.create({
  container: {
    ...shadows.low,
    ...borders.low(),
    height: 49,
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral
  },
  topBar: {
    ...bar,
    ...animation('10%', '13%', 1.5),
    marginBottom: 5
  },
  bottomBar: {
    ...bar,
    ...animation('8%', '15%', 1.2)
  }
})
