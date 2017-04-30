// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import { Link } from 'shared/components'
import type { LinkProps } from 'shared/components/link'
import { dispatch } from 'shared/dispatcher'
import { stylesheet, borders, mobile } from 'shared/styles'

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

const rules = stylesheet({
  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    textDecoration: 'none',
    ...mobile({
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
    ...mobile({
      width: 22,
      marginRight: 8
    })
  }
})
