// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from '../styles'

export class Link extends Component {
  props: {
    url: ?string,
    iconName: string,
    label?: string,
    style?: Object
  }

  // lifecycle
  render (): ?React$Element<*> {
    const { url, iconName, label, style } = this.props
    if (!url) {
      return null
    }

    return <a className={css(styles.link, style)} href={url}>
      <FontAwesome name={iconName} />
      {label && <span className={css(styles.label)}>{label}</span>}
    </a>
  }
}

const styles = StyleSheet.create({
  link: {
    color: colors.primary,
    fontSize: 16,
    transition: 'color 0.25s',
    ':hover': {
      color: colors.primaryHighlight
    }
  },
  label: {
    marginLeft: 5
  }
})
