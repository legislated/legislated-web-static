// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { Content } from './components'
import { stylesheet, colors, shadows, borders } from 'shared/styles'
import type { Viewer } from 'shared/types'

class BillView extends Component {
  props: {
    viewer: ?Viewer
  }

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
  }
})

export const BillScene = Relay.createContainer(BillView, {
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
