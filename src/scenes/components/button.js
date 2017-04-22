// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { IconLink } from './icon_link'
import type { IconLinkProps } from './icon_link' // eslint-disable-line
import { borders, colors } from '../styles'

type ButtonType = 'solid' | 'outline'

export class Button extends Component {
  props: {
    type?: ButtonType
  } & IconLinkProps

  // lifecycle
  render () {
    const { to: url } = this.props
    if (!url) {
      return null
    }

    const { type, label, iconName, style } = this.props
    const isSolid = type === 'solid'

    const linkStyle = [ styles.link, isSolid ? styles.solidLink : {} ]
    const linkProps = { label, iconName, to: url, style: linkStyle }

    return <div className={css(styles.container, isSolid && styles.solid, style)}>
      <IconLink {...linkProps} />
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    ...borders.high(),
    padding: 10,
    borderRadius: 3
  },
  solid: {
    border: 'none',
    backgroundColor: colors.primary
  },
  link: {
    textDecoration: 'none'
  },
  solidLink: {
    color: colors.white
  }
})
