// @flow
import React, { Component } from 'react'
import Clipboard from 'react-copy-to-clipboard'
import FontAwesome from 'react-fontawesome'
import { Link } from './link'
import { stylesheet } from 'shared/styles'

export class CopyLink extends Component {
  props: {
    value: string
  }

  render () {
    const { value } = this.props
    return <Clipboard text={value}>
      <Link styles={rules.link} onClick={() => {}}>
        <FontAwesome name='link' />
        <span>Copy Link</span>
      </Link>
    </Clipboard>
  }
}

const rules = stylesheet({
  link: {
    '> .fa': {
      marginRight: 5
    }
  }
})
