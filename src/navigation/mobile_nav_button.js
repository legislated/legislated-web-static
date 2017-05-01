// @flow
import { merge } from 'lodash'
import React, { Component } from 'react'
import { css } from 'glamor'
import { stylesheet, colors, mobile } from 'shared/styles'
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
    const { isOpen } = this.props
    return <button {...rules.hamburger} type='button' onClick={this.didClickMenu}>
      <span {...rules.hamburgerBox}>
        <span {...css(rules.hamburgerInner, isOpen && rules.hamburgerInnerActive)} />
      </span>
    </button>
  }
}

// styles ported from: https://github.com/jonsuh/hamburgers
const width = 30
const height = 4
const spacing = 4

const base = {
  hamburger: {
    display: 'none',
    overflow: 'visible',
    padding: '15px 15px',
    transition: 'opacity 0.15s linear, filter 0.15s linear',
    '&:focus': {
      outline: 'none'
    },
    '&:hover, &:active': {
      opacity: 0.6
    },
    ...mobile({
      display: 'block'
    })
  },
  hamburgerBox: {
    display: 'inline-block',
    position: 'relative',
    width,
    height: height * 3 + spacing * 2
  },
  hamburgerInner: {
    display: 'block',
    top: '50%',
    marginTop: height / -2,
    '&, &:before, &:after': {
      position: 'absolute',
      width: width,
      height: height,
      backgroundColor: colors.black,
      borderRadius: height / 2,
      transitionDuration: '0.25s',
      transitionTimingFunction: 'ease'
    },
    '&:before, &:after': {
      content: '""',
      display: 'block'
    },
    '&:before': {
      top: (spacing + height) * -1
    },
    '&:after': {
      bottom: (spacing + height) * -1
    }
  }
}

const rules = stylesheet({
  hamburger: {
    ...base.hamburger
  },
  hamburgerBox: {
    ...base.hamburgerBox
  },
  hamburgerInner: merge({ ...base.hamburgerInner }, {
    transitionDuration: '0.22s',
    transitionTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    '&:before': {
      transition: 'top 0.1s 0.25s ease-in, opacity 0.1s ease-in'
    },
    '&:after': {
      transition: 'bottom 0.1s 0.25s ease-in, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    }
  }),
  hamburgerInnerActive: {
    transform: 'rotate(135deg)',
    transitionDelay: '0.12s',
    transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    '&:before': {
      top: 0,
      opacity: 0,
      transition: 'top 0.1s ease-out, opacity 0.1s 0.12s ease-out'
    },
    '&:after': {
      bottom: 0,
      transform: 'rotate(-90deg)',
      transition: 'bottom 0.1s ease-out, transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1)'
    }
  }
})
