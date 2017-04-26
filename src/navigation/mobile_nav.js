// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { elastic as Menu } from 'react-burger-menu'
import { NavItems } from './nav_items'
import { colors, utils } from 'shared/styles'
import { on, off } from 'shared/dispatcher'

export class MobileNav extends Component {
  state = {
    isOpen: false
  }

  subscription: { stop: Function }

  // events
  didChangeMenu = (isOpen: boolean) => {
    this.setState({ isOpen })
  }

  // lifecycle
  componentWillMount () {
    on('menu-changed', this.didChangeMenu)
  }

  componentWillUnmount () {
    off('menu-changed', this.didChangeMenu)
  }

  render () {
    const { isOpen } = this.state

    return <Menu
      className={css(styles.container)}
      styles={styles.nav}
      outerContainerId='container'
      pageWrapId='content'
      isOpen={isOpen}
      right>
      <NavItems showsIcons />
    </Menu>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'none',
    ...utils.mobile({
      display: 'block'
    })
  }
})

// side-step aphrodite for this one
styles.nav = {
  bmBurgerButton: {
    display: 'none'
  },
  bmMenu: {
    background: colors.background
  },
  bmMorphShape: {
    fill: colors.background
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
