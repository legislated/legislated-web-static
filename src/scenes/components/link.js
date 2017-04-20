// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from '../styles'
import type { StyleProp } from '../../types'
import { combine } from '../../types/style_prop'

export type LinkProps = {
  url: ?string,
  iconName: string,
  label?: string,
  style?: StyleProp
}

export class Link extends Component {
  props: LinkProps

  // lifecycle
  render (): ?React$Element<*> {
    const { url, iconName, label, style } = this.props
    if (!url) {
      return null
    }

    return <a className={css(styles.link, combine(style))} href={url}>
      <FontAwesome className={css(styles.icon)} name={iconName} />
      {label && <span className={css(styles.label)}>{label}</span>}
    </a>
  }
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: colors.primary,
    transition: 'color 0.25s',
    ':hover': {
      color: colors.primaryHighlight
    }
  },
  icon: {
    width: 16,
    textAlign: 'center'
  },
  label: {
    marginLeft: 5
  }
})
