// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Content } from './components'
import { colors, shadows, borders } from '../styles'
import type { Viewer } from '../../types'

class BillView extends Component {
  props: {
    viewer: ?Viewer
  }

  render () {
    const { viewer } = this.props

    return <div className={css(styles.container)}>
      <div className={css(styles.content)}>
        {viewer ? <Content bill={viewer.bill} /> : <div>Loading...</div>}
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  back: {
    marginBottom: 10
  },
  content: {
    ...shadows.low,
    ...borders.low(),
    padding: 15,
    backgroundColor: colors.neutral
  }
})

export default Relay.createContainer(BillView, {
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
