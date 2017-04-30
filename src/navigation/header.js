// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link as RouteLink } from 'react-router'
import { NavLinkList } from './nav_link_list'
import { MobileNavButton } from './mobile_nav_button'
import { dispatch } from 'shared/dispatcher'
import { stylesheet, fonts, borders, colors, alpha, mobile } from 'shared/styles'

export class Header extends Component {
  props: {
    menuOpen: boolean
  }

  // events
  didClickLogo = () => {
    dispatch('close-menu')
  }

  // lifecycle
  render () {
    const { menuOpen } = this.props

    return <div {...rules.container}>
      <RouteLink {...rules.logoLink} to='/' onClick={this.didClickLogo}>
        <FontAwesome name='institution' />
        <span>Legislated</span>
      </RouteLink>
      <MobileNavButton isOpen={menuOpen} />
      <div {...rules.nav}>
        <NavLinkList />
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    ...borders.low(['bottom']),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: alpha(colors.white, 0.95),
    ...mobile({
      height: 60,
      paddingLeft: 15,
      paddingRight: 15
    })
  },
  logoLink: {
    color: colors.black,
    fontSize: 32,
    textDecoration: 'none',
    transition: 'color 0.25s',
    ':hover': {
      color: alpha(colors.black, 0.6)
    },
    '> span:last-child': {
      ...fonts.bold,
      marginLeft: 15
    },
    ...mobile({
      fontSize: 28
    })
  },
  nav: {
    ...borders.low(['left']),
    flex: 1,
    display: 'flex',
    marginLeft: 15,
    paddingLeft: 15,
    ...mobile({
      display: 'none'
    })
  }
})
