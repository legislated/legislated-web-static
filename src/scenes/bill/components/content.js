// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { Actions } from './actions'
import { Element } from './element'
import { stylesheet, borders, colors, mobile } from 'shared/styles'
import type { Bill } from 'shared/types'

const { floor } = Math

class ContentView extends Component {
  props: {
    bill: Bill
  }

  // lifecycle
  render () {
    const { bill } = this.props

    const now = moment()
    const date = moment(bill.hearing.date)
    const hoursLeft = floor(date.diff(now, 'hours', true))

    return <div>
      <div {...rules.header}>
        {bill.title && <h1>{bill.title}</h1>}
        <h4>{bill.documentNumber}</h4>
      </div>
      <div {...rules.body}>
        <div {...rules.column}>
          <Element label='State Synopsis'>{bill.summary}</Element>
        </div>
        <div {...rules.column}>
          <Element label='Hearing Date'>
            <span>{date.calendar()}</span>
            {hoursLeft < 24 && <span {...rules.hoursLeft}>
              {`(${hoursLeft} hours left)`}
            </span>}
          </Element>
          <Element label='Committee'>{bill.committee.name}</Element>
        </div>
      </div>
      <Actions bill={bill} />
    </div>
  }
}

const rules = stylesheet({
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    ...mobile({
      '> h1': {
        marginBottom: 5
      }
    })
  },
  body: {
    ...borders.low(['bottom']),
    display: 'flex',
    flexBasis: 0,
    paddingBottom: 15,
    marginBottom: 15,
    ...mobile({
      flexDirection: 'column'
    })
  },
  column: {
    flex: 1,
    '> *:not(:last-child)': {
      marginBottom: 10
    },
    ...mobile({
      marginBottom: 15,
      ':last-child': {
        marginBottom: 0
      }
    })
  },
  hoursLeft: {
    marginLeft: 5,
    color: colors.secondary
  }
})

export const Content = Relay.createContainer(ContentView, {
  fragments: {
    bill: () => Relay.QL`
      fragment on Bill {
        documentNumber
        title
        summary
        sponsorName
        hearing {
          date
        }
        committee {
          name
        }
        chamber {
          name
        }
        ${Actions.getFragment('bill')}
      }
    `
  }
})
