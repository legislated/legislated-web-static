// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import FontAwesome from 'react-fontawesome'
import { Content } from './components'
import { Link } from 'shared/components'
import { stylesheet, colors, shadows, borders } from 'shared/styles'
import type { Viewer, History } from 'shared/types'

class BillView extends Component {
  props: {
    viewer: ?Viewer,
    history: History
  }

  // events
  didClickBack = () => {
    this.props.history.goBack()
  }

  // lifecycle
  render () {
    const { viewer } = this.props

    return <div {...rules.container}>
      <div {...rules.content}>
        <Link styles={rules.backLink} onClick={() => this.didClickBack()}>
          <FontAwesome name='chevron-left' />
          <span>Back to Search</span>
        </Link>
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
