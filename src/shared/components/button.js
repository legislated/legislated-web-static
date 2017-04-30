// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import { Link } from './link'
import type { LinkProps } from './link' // eslint-disable-line
import { borders, colors, utils } from 'shared/styles'

type ButtonType = 'solid' | 'outline'

export class Button extends Component {
  props: {
    label: string,
    iconName: string,
    type?: ButtonType
  } & LinkProps

  // lifecycle
  render () {
    const { type, label, iconName, styles, ...linkProps } = this.props
    const isSolid = type === 'solid'

    const linkRule = css(rules.button, isSolid && rules.solid, styles)
    return <Link styles={linkRule} {...linkProps}>
      <FontAwesome {...rules.icon} name={iconName} />
      <span>{label}</span>
    </Link>
  }
}

const rules = {
  button: css({
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
  }),
  solid: css({
    border: 'none',
    backgroundColor: colors.primary,
    color: colors.white
  }),
  icon: css({
    width: 16,
    marginRight: 5,
    textAlign: 'center'
  })
}
