// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from './link'
import type { LinkProps } from './link' // eslint-disable-line
import { combine } from 'shared/types/style_prop'

const { max } = Math

export type IconLinkProps = {
  iconName: string,
  label?: string,
} & LinkProps

export class IconLink extends Component {
  props: IconLinkProps

  // lifecycle
  render (): ?React$Element<*> {
    const { to: url, label, iconName, style } = this.props

    // tack the font size onto the front so it can be overriden
    const linkStyle = combine(style)
    linkStyle.unshift(styles.link)

    // hack the font size out, really gotta ditch aphrodite
    const fontSize = linkStyle.reduce((size, style) => {
      const { fontSize: otherSize } = style._definition
      return otherSize ? max(style._definition.fontSize) : size
    }, 0)

    return <Link to={url} style={linkStyle} >
      <FontAwesome style={{ width: fontSize }} className={css(styles.icon)} name={iconName} />
      {label && <span className={css(styles.label)}>{label}</span>}
    </Link>
  }
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16
  },
  icon: {
    textAlign: 'center'
  },
  label: {
    marginLeft: 5
  }
})
