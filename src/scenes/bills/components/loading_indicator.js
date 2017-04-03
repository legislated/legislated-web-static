// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors, shadows, borders } from '../../styles'

export default class LoadingIndicator extends Component {
  render () {
    return <div className={css(styles.container)}>
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
    ...borders.low,
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
