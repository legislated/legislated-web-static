// @flow
import React, { Component } from 'react'
import { push as Menu } from 'react-burger-menu'
import { NavLinkList } from './nav_link_list'
import { stylesheet, colors, mobile } from 'shared/styles'
import { dispatch } from 'shared/dispatcher'

export class MobileNav extends Component {
  props: {
    isOpen: boolean
  }

  // events
  didChangeMenuState = (state: { isOpen: boolean }) => {
    // if these are different, the overlay closed the menu
    if (this.props.isOpen && !state.isOpen) {
      dispatch('close-menu')
    }
  }

  // lifecycle
  render () {
    const { isOpen } = this.props

    return <Menu
      {...rules.container}
      styles={navRules}
      right
      isOpen={isOpen}
      onStateChange={this.didChangeMenuState}>
      <NavLinkList
        styles={rules.links}
        showsIcons />
    </Menu>
  }
}

const rules = stylesheet({
  container: {
    display: 'none',
    ...mobile({
      display: 'block'
    })
  },
  links: {
    padding: 30
  }
})

// side-step glamor for this one
const navRules = {
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
