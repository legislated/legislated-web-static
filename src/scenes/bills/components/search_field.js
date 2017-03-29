// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import FontAwesome from 'react-fontawesome'
import { fonts, colors, shadows } from '../../styles'

export default class SearchField extends Component {
  props: {
    value: string,
    style: Object,
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
    const { value, style } = this.props
    const { isFocused } = this.state

    return <div className={css(styles.container, style)}>
      <div className={css(styles.prompt)}>What's important to you?</div>
      <div className={css(styles.field, isFocused && styles.focused)}>
        <FontAwesome
          className={css(styles.icon)}
          name='search'
        />
        <input
          className={css(styles.input)}
          type='text'
          name='search-field'
          value={value}
          placeholder={`health care, HB2364`}
          onChange={this.inputDidChange}
          onFocus={() => this.inputDidChangeFocus(true)}
          onBlur={() => this.inputDidChangeFocus(false)}
        />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  prompt: {
    ...fonts.regular,
    marginBottom: 15,
    fontSize: 24
  },
  field: {
    ...shadows.low,
    display: 'flex',
    alignItems: 'center',
    height: 50,
    padding: '0 15px',
    borderRadius: 2,
    backgroundColor: colors.white,
    transition: 'box-shadow 0.25s, transform 0.25s',
    transform: 'perspective(200px) translateZ(0px)'
  },
  focused: {
    ...shadows.high,
    transform: 'perspective(200px) translateZ(1px)'
  },
  icon: {
    marginRight: 15
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
