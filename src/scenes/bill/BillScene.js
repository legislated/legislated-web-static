// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { Content } from './components'
import { stylesheet, colors, shadows, borders } from 'shared/styles'
import type { Viewer } from 'shared/types'

let BillScene = class BillScene extends Component {
  props: {
    viewer: ?Viewer,
  }

  // lifecycle
  render () {
    const { viewer } = this.props

    return <div {...rules.container}>
      <div {...rules.content}>
        {viewer ? <Content bill={viewer.bill} /> : <div>Loading...</div>}
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...shadows.low,
    ...borders.low(),
    padding: 15,
    backgroundColor: colors.neutral
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    '> .fa': {
      marginRight: 5,
      fontSize: 13
    }
  }
})

BillScene = Relay.createContainer(BillScene, {
  initialVariables: {
    id: ''
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        bill(id: $id) {
          ${Content.getFragment('bill')}
        }
      }
    `
  }
})

export { BillScene }
