// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'
import { fonts, colors, shadows, borders } from '../../styles'
import type { Bill } from '../../../types'

class BillCell extends Component {
  props: {
    bill: Bill,
    style?: Object,
    isLast: boolean
  }

  // lifecycle
  render () {
    const { bill, style, isLast } = this.props
    const date = moment(bill.hearing.date)

    return <div className={css(styles.container, style, isLast && styles.last)}>
      <div className={css(styles.header)}>
        <span className={css(styles.documentNumber)}>{bill.documentNumber}</span>
        <span className={css(styles.title)}>{bill.title}</span>
        <span className={css(styles.date)}>{date.calendar()}</span>
      </div>
      <div>
        {bill.witnessSlipUrl && this.renderSlipLink(bill.witnessSlipUrl)}
      </div>
      {bill.summary && <div className={css(styles.summary)}>{bill.summary}</div>}
    </div>
  }

  renderSlipLink (url: string): React$Element<*> {
    return <a className={css(styles.slipLink)} href={url}>
      <FontAwesome name='pencil-square-o' />
      <span className={css(styles.slipLinkLabel)}>Take Action</span>
    </a>
  }
}

const styles = StyleSheet.create({
  container: {
    ...shadows.low,
    ...borders.low,
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral
  },
  last: {
    marginBottom: 0
  },
  header: {
    marginBottom: 5
  },
  documentNumber: {
    ...fonts.bold,
    marginRight: 10
  },
  title: {
    marginRight: 10
  },
  slipLink: {
    color: colors.primary,
    ':hover': {
      color: colors.primaryHighlight
    }
  },
  slipLinkLabel: {
    marginLeft: 5
  },
  summary: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1px solid ${colors.neutralOutline}`
  }
})

export default Relay.createContainer(BillCell, {
  fragments: {
    bill: () => Relay.QL`
      fragment on Bill {
        id
        documentNumber
        title
        summary
        witnessSlipUrl
        hearing {
          date
        }
      }
    `
  }
})
