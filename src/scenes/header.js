// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { fonts, borders, colors, alpha } from './styles'
import { Link } from './components'

export class Header extends Component {
  render () {
    return <div className={css(styles.container)}>
      <Link style={styles.icon} url='/' label='Legislated' iconName='institution' />
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
  icon: {
    ...fonts.bold,
    fontSize: 32,
    color: colors.black,
    textDecoration: 'none',
    ':hover': {
      color: alpha(colors.black, 0.6)
    }
  }
})
