// @flow
import React, { Component } from 'react'
import { StyleSheet, css as cssa } from 'aphrodite/no-important'
import { css } from 'glamor'
import { NavLink } from './nav_link'
import { utils } from 'shared/styles'
import type { StyleProp } from 'shared/types'
import { combine } from 'shared/types/style_prop'

export class NavLinkList extends Component {
  props: {
    showsIcons?: boolean,
    style?: StyleProp
  }

  static defaultProps = {
    showsIcons: false
  }

  // lifecycle
  render () {
    const { showsIcons, style } = this.props

    return <div className={cssa(styles.links, combine(style))}>
      <NavLink
        styles={rules.link}
        to='/'
        iconName='search'
        label='Search Bills' />
      <div className={cssa(styles.secondaryLinks)}>
        <NavLink
          styles={rules.link}
          to='/faq'
          iconName={showsIcons ? 'question' : null}
          label='FAQ' />
        <NavLink
          styles={rules.link}
          to='/about'
          iconName={showsIcons ? 'heart' : null}
          label='About Us' />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  links: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    ...utils.mobile({
      flexDirection: 'column',
      justifyContent: 'flex-start'
    })
  },
  secondaryLinks: {
    display: 'flex',
    ...utils.mobile({
      flexDirection: 'column'
    })
  },
  link: {
    marginRight: 10,
    fontSize: 20,
    ...utils.mobile({
      marginRight: 0
    })
  },
  lastLink: {
    marginRight: 0
  }
})

const rules = {
  link: css({
    marginRight: 10,
    fontSize: 20,
    '& + &': {
      marginRight: 0
    },
    ...utils.mobile({
      marginRight: 0
    })
  })
}
