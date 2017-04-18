// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors } from '../../styles'

export default class BillLink extends Component {
  props: {
    url: ?string,
    label: string,
    iconName: string,
    style?: Object
  }

  render (): ?React$Element<*> {
    const { url, iconName, label, style } = this.props
    if (!url) {
      return null
    }

    return <a className={css(styles.slipLink, style)} href={url}>
      <FontAwesome name={iconName} />
      <span className={css(styles.slipLinkLabel)}>{label}</span>
    </a>
  }
}

const styles = StyleSheet.create({
  slipLink: {
    color: colors.primary,
    ':hover': {
      color: colors.primaryHighlight
    }
  },
  slipLinkLabel: {
    marginLeft: 5
  }
})
