// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { IconLink } from 'shared/components'
import { utils } from 'shared/styles'

export class NavItems extends Component {
  props: {
    showsIcons?: boolean
  }

  // lifecycle
  render () {
    const showsIcons = this.props.showsIcons || false

    return <div className={css(styles.links)}>
      <IconLink
        style={styles.link}
        to='/'
        iconName='search'
        label='Search Bills' />
      <div className={css(styles.secondaryLinks)}>
        <IconLink
          style={styles.link}
          to='/faq'
          iconName={showsIcons ? 'question' : null}
          label='FAQ' />
        <IconLink
          style={[styles.link, styles.lastLink]}
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
      flexDirection: 'column'
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

// side-step aphrodite for this one
styles.mobileLink = {
  fontSize: 28,
  margin: 8
}
