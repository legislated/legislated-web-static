// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { push as Menu } from 'react-burger-menu'
import { NavLinkList } from './nav_link_list'
import { colors, utils } from 'shared/styles'
import { dispatch } from 'shared/dispatcher'

export class MobileNav extends Component {
  props: {
    isOpen: boolean
  }

  // events
  didChangeMenuState = (state: { isOpen: boolean }) => {
    // if these are different, the overlay closed the menu
    if (this.props.isOpen !== state.isOpen) {
      dispatch('close-menu')
    }
  }

  // lifecycle
  render () {
    const { isOpen } = this.props

    return <Menu
      className={css(styles.container)}
      styles={styles.nav}
      outerContainerId='container'
      pageWrapId='content'
      right
      isOpen={isOpen}
      onStateChange={this.didChangeMenuState}>
      <NavLinkList
        style={styles.links}
        showsIcons />
    </Menu>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'none',
    ...utils.mobile({
      display: 'block'
    })
  },
  links: {
    padding: 30
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
  bmItemList: {
    display: 'flex',
    marginLeft: -10
  },
  bmMorphShape: {
    fill: colors.background
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
