// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import { stylesheet, fonts, colors, shadows, borders } from 'shared/styles'

export class SearchField extends Component {
  props: {
    value: string,
    styles?: Object,
    onChange: (string) => void
  }

  state = {
    isFocused: false
  }

  // events
  inputDidChange = (event: { target: { value: string } }) => {
    const { onChange } = this.props
    onChange(event.target.value)
  }

  inputDidChangeFocus = (isFocused: boolean) => {
    this.setState({ isFocused })
  }

  // lifecycle
  render () {
    const { value, styles } = this.props
    const { isFocused } = this.state

    return <div {...css(rules.container, styles)}>
      <h1 {...rules.prompt}>What's important to you?</h1>
      <div {...css(rules.field, isFocused && rules.focused)}>
        <FontAwesome
          {...css(rules.icon, isFocused && rules.iconFocused)}
          name='search' />
        <input
          {...rules.input}
          type='text'
          name='search-field'
          value={value}
          placeholder={`health care, HB2364`}
          onChange={this.inputDidChange}
          onFocus={() => this.inputDidChangeFocus(true)}
          onBlur={() => this.inputDidChangeFocus(false)} />
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  prompt: {
    marginBottom: 15
  },
  field: {
    ...shadows.low,
    ...borders.low(),
    display: 'flex',
    alignItems: 'center',
    height: 50,
    padding: '0 15px',
    backgroundColor: colors.neutral,
    transition: 'box-shadow 0.25s, border 0.25s, transform 0.25s',
    transform: 'perspective(200px) translateZ(0px)',
    cursor: 'text'
  },
  focused: {
    ...shadows.high,
    ...borders.high(),
    transform: 'perspective(200px) translateZ(1px)'
  },
  icon: {
    width: 15,
    marginRight: 15,
    transition: 'color 0.25'
  },
  iconFocused: {
    color: colors.primary
  },
  input: {
    ...fonts.regular,
    flex: 1,
    fontSize: 20,
    border: 'none',
    ':focus': {
      outline: 'none'
    }
  }
})
