// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite/no-important'

export class Element extends Component {
  props: {
    label: string,
    value: string,
    style?: Object
  }

  render () {
    const { label, value, style } = this.props

    return <div className={css(style)}>
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  }
}
