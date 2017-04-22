// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite/no-important'

export class Element extends Component {
  props: {
    label: string,
    style?: Object,
    children?: any
  }

  render () {
    const { label, children, style } = this.props

    return <div className={css(style)}>
      <h3>{label}</h3>
      {children}
    </div>
  }
}
