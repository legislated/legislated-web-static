// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import { Content } from './components'
import { stylesheet, colors, shadows, borders } from 'shared/styles'
import type { Bill } from 'shared/types'

let BillScene = class BillScene extends Component {
  props: {
    bill: ?Bill,
  }

  // lifecycle
  render () {
    const { bill } = this.props

    return <div {...rules.container}>
      <div {...rules.content}>
        {bill ? <Content bill={bill} /> : <div>Loading...</div>}
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

BillScene = createFragmentContainer(withRouter(BillScene), graphql`
  fragment BillScene_bill on Bill {
    ...Content_bill
  }
`)

export { BillScene }
