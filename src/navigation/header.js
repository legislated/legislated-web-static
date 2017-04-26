// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link as RouteLink } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
import { IconLink } from 'shared/components'
import { fonts, borders, colors, alpha, utils } from 'shared/styles'

export class Header extends Component {
  render () {
    return <div className={css(styles.container)}>
      <RouteLink className={css(styles.logoLink)} to='/'>
        <FontAwesome name='institution' />
        <span className={css(styles.logoTitle)}>Legislated</span>
      </RouteLink>
      <div className={css(styles.sceneLinks)}>
        <IconLink style={styles.sceneLink} to='/' iconName='paper-plane-o' label='Search Bills' />
        <IconLink style={styles.sceneLink} to='/faq' iconName='paper-plane-o' label='FAQs' />
        <IconLink style={styles.sceneLink} to='/about' iconName='paper-plane-o' label='About Us' />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    ...borders.low(['bottom']),
    display: 'flex',
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
  sceneLinks: {
    ...borders.low(['left']),
    marginLeft: 15,
    paddingLeft: 15
  },
  sceneLink: {
    fontSize: 20,
    ...utils.mobile({
      fontSize: 18
    })
  }
})
