// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link as RouteLink } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from '../styles'
import type { StyleProp } from '../../types'
import { combine } from '../../types/style_prop'

export type LinkProps = {
  to: ?string,
  iconName: string,
  label?: string,
  style?: StyleProp
}

export class Link extends Component {
  props: LinkProps

  // lifecycle
  render (): ?React$Element<*> {
    const { to: url } = this.props
    if (!url) {
      return null
    }

    const { label, iconName, style } = this.props
    return <Link.Base url={url} style={style} >
      <FontAwesome className={css(styles.icon)} name={iconName} />
      {label && <span className={css(styles.label)}>{label}</span>}
    </Link.Base>
  }

  static Base (props: { url: string, style?: StyleProp, children?: any }): React$Element<any> {
    const { url, style, children } = props
    const className = css(styles.link, combine(style))

    // use anchor tags for absolute urls, otherwise use a router link
    if (/https?:\/\//.test(url)) {
      return <a className={className} href={url}>{children}</a>
    } else {
      return <RouteLink className={className} to={url}>{children}</RouteLink>
    }
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
