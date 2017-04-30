// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import { mobile } from 'shared/styles'
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
    return <button {...rule} onClick={this.didClickMenu}>
      <FontAwesome name={icon} />
    </button>
  }
}

const rule = css({
  display: 'none',
  padding: 0,
  border: 'none',
  background: 'none',
  fontSize: 28,
  cursor: 'pointer',
  ':focus': {
    outline: 'none'
  },
  ...mobile({
    display: 'block'
  })
})
