// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors, shadows } from '../../styles'

export default class LoadMoreButton extends Component {
  props: {
    style?: Object,
    hasMore: boolean,
    onClick: Function
  }

  // events
  didClickLink = () => {
    this.props.onClick()
  }

  // lifecycle
  render () {
    const { style, hasMore } = this.props
    if (!hasMore) {
      return null
    }

    return <a className={css(styles.button, style)} onClick={this.didClickLink}>
      Load More
    </a>
  }
}

const styles = StyleSheet.create({
  button: {
    ...shadows.make(colors.primaryShadow, 5),
    height: 40,
    minWidth: 100,
    padding: '0 5%',
    fontSize: 18,
    lineHeight: '40px',
    textAlign: 'center',
    color: colors.white,
    backgroundColor: colors.primary,
    transition: 'background-color 0.25s',
    ':hover': {
      backgroundColor: colors.primaryHighlight
    }
  }
})
