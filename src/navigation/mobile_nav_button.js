// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import FontAwesome from 'react-fontawesome'
import { utils } from 'shared/styles'
import { dispatch } from 'shared/dispatcher'

export class MobileNavButton extends Component {
  props: {
    isOpen: boolean
  }

  // events
  didClickMenu = () => {
    const event = this.props.isOpen ? 'close-menu' : 'open-menu'
    dispatch(event)
  }

  // lifecycle
  render () {
    const icon = this.props.isOpen ? 'close' : 'bars'
    return <button className={css(styles.button)} onClick={this.didClickMenu}>
      <FontAwesome name={icon} />
    </button>
  }
}

const styles = StyleSheet.create({
  button: {
    display: 'none',
    padding: 0,
    border: 'none',
    background: 'none',
    fontSize: 28,
    cursor: 'pointer',
    ':focus': {
      outline: 'none'
    },
    ...utils.mobile({
      display: 'block'
    })
  }
})
