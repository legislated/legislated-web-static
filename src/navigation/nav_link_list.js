// @flow
import React, { Component } from 'react'
import { NavLink } from './nav_link'
import { css } from 'glamor'
import type { Rule } from 'glamor' // eslint-disable-line
import { stylesheet, utils } from 'shared/styles'

export class NavLinkList extends Component {
  props: {
    showsIcons?: boolean,
    styles?: Rule
  }

  static defaultProps = {
    showsIcons: false
  }

  // lifecycle
  render () {
    const { showsIcons, styles } = this.props

    return <div {...css(rules.links, styles)}>
      <NavLink
        styles={rules.link}
        to='/'
        iconName='search'
        label='Search Bills' />
      <div {...rules.secondaryLinks}>
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

const rules = stylesheet({
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
  }
})
