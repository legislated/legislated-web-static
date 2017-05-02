// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { css } from 'glamor'
import type { Rule } from 'glamor' // eslint-disable-line
import type { Bill } from 'shared/types'
import { Button } from 'shared/components'
import { stylesheet, fonts, colors, shadows, borders, mobile } from 'shared/styles'

class Cell extends Component {
  props: {
    bill: Bill,
    styles?: Rule
  }

  // lifecycle
  render () {
    const { bill, styles } = this.props
    const date = moment(bill.hearing.date)

    return <div {...css(rules.container, styles)}>
      <div {...rules.info}>
        <div {...rules.header}>
          <div {...rules.document}>
            <h3>{bill.title}</h3>
            <span>{bill.documentNumber}</span>
          </div>
          <p>{date.calendar()}</p>
        </div>
        {bill.summary && <p {...rules.summary}>{bill.summary}</p>}
      </div>
      <div {...rules.actions}>
        <Button
          type='solid'
          styles={rules.button}
          to={bill.witnessSlipUrl}
          label='Take Action'
          iconName='pencil-square-o' />
        <Button
          styles={rules.button}
          to={`bill/${bill.id}`}
          label='More Info'
          iconName='file-text-o' />
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    ...shadows.low,
    ...borders.low(),
    display: 'flex',
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral,
    '&:last-child': {
      marginBottom: 0
    },
    ...mobile({
      flexDirection: 'column'
    })
  },
  info: {
    ...borders.low(['right']),
    flex: 1,
    paddingRight: 15,
    ...mobile({
      ...borders.low(['bottom']),
      paddingRight: 0,
      paddingBottom: 15,
      marginBottom: 15,
      borderRight: 'none'
    })
  },
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  document: {
    marginBottom: 5,
    '> *': {
      display: 'inline-block'
    },
    '> h3': {
      ...fonts.bold,
      marginRight: 10
    }
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 15,
    ...mobile({
      flexDirection: 'row',
      paddingLeft: 0
    })
  },
  button: {
    width: 200,
    marginBottom: 10,
    ':last-child': {
      marginBottom: 0
    },
    ...mobile({
      flex: 1,
      width: 'auto',
      marginBottom: 0,
      marginRight: 10,
      ':last-child': {
        marginRight: 0
      }
    })
  },
  summary: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1px solid ${colors.neutralOutline}`
  }
})

export const BillCell = Relay.createContainer(Cell, {
  fragments: {
    bill: () => Relay.QL`
      fragment on Bill {
        id
        documentNumber
        title
        summary
        witnessSlipUrl
        detailsUrl
        fullTextUrl
        hearing {
          date
        }
      }
    `
  }
})
