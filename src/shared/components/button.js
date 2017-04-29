// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import FontAwesome from 'react-fontawesome'
import { Link } from './link'
import type { LinkProps } from './link' // eslint-disable-line
import { borders, colors, utils } from 'shared/styles'
import { combine } from 'shared/types/style_prop'

type ButtonType = 'solid' | 'outline'

export class Button extends Component {
  props: {
    label: string,
    iconName: string,
    type?: ButtonType
  } & LinkProps

  // lifecycle
  render () {
    const { type, label, iconName, style, ...linkProps } = this.props

    const isSolid = type === 'solid'
    const linkStyle = combine(style)
    linkStyle.unshift(styles.button, isSolid ? styles.solid : {})

    return <Link {...linkProps} style={linkStyle}>
      <FontAwesome className={css(styles.icon)} name={iconName} />
      <span>{label}</span>
    </Link>
  }
}

const styles = StyleSheet.create({
  button: {
    ...borders.high(),
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
    fontSize: 16,
    textDecoration: 'none',
    ...utils.mobile({
      padding: 9
    })
  },
  solid: {
    border: 'none',
    backgroundColor: colors.primary,
    color: colors.white
  },
  icon: {
    width: 16,
    marginRight: 5,
    textAlign: 'center'
  }
})
