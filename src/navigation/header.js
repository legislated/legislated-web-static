// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link as RouteLink } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
import { NavItems } from './nav_items'
import { MobileNavButton } from './mobile_nav_button'
import { fonts, borders, colors, alpha, utils } from 'shared/styles'

export class Header extends Component {
  render () {
    return <div className={css(styles.container)}>
      <RouteLink className={css(styles.logoLink)} to='/'>
        <FontAwesome name='institution' />
        <span className={css(styles.logoTitle)}>Legislated</span>
      </RouteLink>
      <MobileNavButton />
      <div className={css(styles.nav)}>
        <NavItems />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    ...borders.low(['bottom']),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: alpha(colors.white, 0.95),
    ...utils.mobile({
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
    ...utils.mobile({
      fontSize: 28
    })
  },
  logoTitle: {
    ...fonts.bold,
    marginLeft: 15
  },
  nav: {
    ...borders.low(['left']),
    flex: 1,
    display: 'flex',
    marginLeft: 15,
    paddingLeft: 15,
    ...utils.mobile({
      display: 'none'
    })
  }
})
