// @flow
import React, { Component } from 'react'
import Relay from 'react-relay/classic'
import { Button } from 'shared/components'
import { stylesheet, mobile } from 'shared/styles'
import type { Bill } from 'shared/types'

class ActionsView extends Component {
  props: {
    bill: Bill
  }

  // lifecycle
  render () {
    const { bill } = this.props

    return <div {...rules.actions}>
      <div>
        <Button
          styles={rules.button}
          to={bill.witnessSlipUrl}
          label='Take Action'
          iconName='pencil-square-o'
          type='solid' />
        <Button
          styles={rules.button}
          to={bill.witnessSlipResultUrl}
          label='View Results'
          iconName='list-ul' />
      </div>
      <div>
        <Button
          styles={rules.button}
          to={bill.detailsUrl}
          label='View Details'
          iconName='info-circle' />
        <Button
          styles={rules.button}
          to={bill.fullTextUrl}
          label='View Full Text'
          iconName='file-text-o' />
      </div>
    </div>
  }
}

const rules = stylesheet({
  actions: {
    display: 'flex',
    '> div': {
      display: 'flex'
    },
    '> div + div': {
      marginLeft: 10
    },
    ...mobile({
      flexDirection: 'column',
      '> div + div': {
        marginLeft: 0,
        marginTop: 10
      }
    })
  },
  button: {
    marginRight: 10,
    ':last-child': {
      marginRight: 0
    },
    ...mobile({
      flex: 1,
      overflow: 'hidden',
      ':last-child': {
        marginRight: 0
      },
      '> span:last-child': {
        direction: 'rtl',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    })
  }
})

export const Actions = Relay.createContainer(ActionsView, {
  fragments: {
    bill: () => Relay.QL`
      fragment on Bill {
        detailsUrl
        fullTextUrl
        witnessSlipUrl
        witnessSlipResultUrl
      }
    `
  }
})
