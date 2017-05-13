// @flow
import React, { Component } from 'react'
import Clipboard from 'react-copy-to-clipboard'
import FontAwesome from 'react-fontawesome'
import { Link } from './link'
import { notifications } from 'shared/notifications'
import { stylesheet } from 'shared/styles'

export class CopyLink extends Component {
  props: {
    value: string
  }

  // events
  didCopyValue = (text: string) => {
    notifications.add({
      key: 'copy-link',
      message: 'Copied link to clipboard ✔'
    })
  }

  // lifecycle
  render () {
    const { value } = this.props
    return <Clipboard text={value} onCopy={this.didCopyValue}>
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
