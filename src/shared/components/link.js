// @flow
import React, { Component } from 'react'
import { Link as RouteLink } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from 'shared/styles'
import type { StyleProp } from 'shared/types'
import { combine } from 'shared/types/style_prop'

export type LinkProps = {
  to: ?string,
  style?: StyleProp,
}

export class Link extends Component {
  props: {
    children?: any
  } & LinkProps

  // lifecycle
  render (): ?React$Element<*> {
    const { to: url } = this.props
    if (!url) {
      return null
    }

    const { style, children } = this.props
    return <Link.Base url={url} style={style}>
      {children}
    </Link.Base>
  }

  static Base (props: { url: string, style?: StyleProp, children?: any }): React$Element<any> {
    const { url, style, children } = props
    const className = css(styles.link, combine(style))

    // use anchor tags for absolute urls, otherwise use a router link
    if (/https?:\/\//.test(url)) {
      return <a className={className} href={url} target='_blank'>{children}</a>
    } else {
      return <RouteLink className={className} to={url}>{children}</RouteLink>
    }
  }
}

const styles = StyleSheet.create({
  link: {
    display: 'inline-block',
    color: colors.primary,
    transition: 'color 0.25s',
    ':hover': {
      color: colors.primaryHighlight
    }
  }
})
