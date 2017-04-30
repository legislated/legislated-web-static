// @flow
import React, { Component } from 'react'
import { Link as RouteLink } from 'react-router'
import { css } from 'glamor'
import type { Rule } from 'glamor' // eslint-disable-line
import { colors } from 'shared/styles'

export type LinkProps = {
  to?: string,
  onClick?: () => void,
  styles?: Rule,
}

export class Link extends Component {
  props: {
    children?: any
  } & LinkProps

  // lifecycle
  render () {
    const { to: url, onClick, styles, children } = this.props
    if (!url && !onClick) {
      return null
    }

    const linkRule = css(rule, styles)

    // use anchor tags for absolute urls, otherwise use a router link
    if (!url || /https?:\/\//.test(url)) {
      return <a {...linkRule} href={url} onClick={onClick} target='_blank'>{children}</a>
    } else {
      return <RouteLink {...linkRule} to={url} onClick={onClick}>{children}</RouteLink>
    }
  }
}

const rule = css({
  display: 'inline-block',
  color: colors.primary,
  transition: 'color 0.25s',
  ':hover': {
    color: colors.primaryHighlight
  }
})
