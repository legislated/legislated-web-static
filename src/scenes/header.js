// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { fonts, borders, colors, alpha } from './styles'

export class Header extends Component {
  render () {
    return <div className={css(styles.container)}>
      <a className={css(styles.link)} href='/'>
        <FontAwesome name='institution' />
        <span className={css(styles.title)}>Legislated</span>
      </a>
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
    backgroundColor: alpha(colors.white, 0.95)
  },
  link: {
    color: colors.black,
    fontSize: 32,
    textDecoration: 'none',
    transition: 'color 0.25s',
    ':hover': {
      color: alpha(colors.black, 0.6)
    }
  },
  title: {
    ...fonts.bold,
    marginLeft: 15
  }
})
