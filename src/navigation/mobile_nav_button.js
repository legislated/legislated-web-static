// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import FontAwesome from 'react-fontawesome'
import { utils } from 'shared/styles'
import { dispatch } from 'shared/dispatcher'

export class MobileNavButton extends Component {
  state = {
    isOpen: false
  }

  // events
  didClickMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
    dispatch('menu-changed', !isOpen)
  }

  // lifecycle
  render () {
    const icon = this.state.isOpen ? 'close' : 'bars'

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
