// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
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
    const { to: url, label, iconName, styles } = this.props
    const linkRule = css(rules.link, styles)

    return <Link to={url} onClick={this.didClickLink} styles={linkRule}>
      {iconName && <FontAwesome {...rules.icon} name={iconName} />}
      <span>{label}</span>
    </Link>
  }
}

const rules = {
  link: css({
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
  }),
  icon: css({
    width: 20,
    marginRight: 6,
    textAlign: 'center',
    ...utils.mobile({
      width: 22,
      marginRight: 8
    })
  })
}
