// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import FontAwesome from 'react-fontawesome'
import { Link } from 'shared/components'
import { borders, utils } from 'shared/styles'
import { dispatch } from 'shared/dispatcher'
import { combine } from 'shared/types/style_prop'
import type { LinkProps } from 'shared/components/link'

export class NavLink extends Component {
  props: {
    label: string,
    iconName: ?string,
  } & LinkProps

  // events
  didClickLink = () => {
    dispatch('close-menu')
  }

  // lifecycle
  render () {
    const { to: url, label, iconName, style } = this.props
    const linkStyle = [styles.link].concat(combine(style))

    return <Link to={url} onClick={this.didClickLink} style={linkStyle}>
      {iconName && <FontAwesome className={css(styles.icon)} name={iconName} />}
      <span>{label}</span>
    </Link>
  }
}

const styles = StyleSheet.create({
  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    textDecoration: 'none',
    ...utils.mobile({
      ...borders.low(['bottom']),
      marginBottom: 15,
      paddingBottom: 15,
      fontSize: 22
    })
  },
  icon: {
    width: 20,
    marginRight: 6,
    textAlign: 'center',
    ...utils.mobile({
      width: 22,
      marginRight: 8
    })
  }
})
