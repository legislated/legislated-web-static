// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from '../../styles'

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
    height: 40,
    padding: '0 15px',
    lineHeight: '40px',
    color: colors.highlight,
    outline: `${colors.highlight} 1px solid`
  }
})
