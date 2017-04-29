// @flow
import React, { Component } from 'react'
import { Link as RouteLink } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from 'shared/styles'
import type { StyleProp } from 'shared/types'
import { combine } from 'shared/types/style_prop'

export type LinkProps = {
  to?: string,
  onClick?: () => void,
  style?: StyleProp,
}

type BaseLinkProps = {
  children?: any
} & LinkProps

export class Link extends Component {
  props: BaseLinkProps

  // lifecycle
  render () {
    const { to: url, onClick, style, children } = this.props
    if (!url && !onClick) {
      return null
    }

    const className = css(styles.link, combine(style))

    // use anchor tags for absolute urls, otherwise use a router link
    if (!url || /https?:\/\//.test(url)) {
      return <a className={className} href={url} onClick={onClick} target='_blank'>{children}</a>
    } else {
      return <RouteLink className={className} to={url} onClick={onClick}>{children}</RouteLink>
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
