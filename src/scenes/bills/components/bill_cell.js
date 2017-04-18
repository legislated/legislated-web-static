// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import BillLink from './bill_link'
import { fonts, colors, shadows, borders } from '../../styles'
import type { Bill } from '../../../types'

class BillCell extends Component {
  props: {
    bill: Bill,
    isLast: boolean,
    style?: Object
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
        <BillLink style={styles.link} url={bill.witnessSlipUrl} label='Take Action' iconName='pencil-square-o' />
        <BillLink style={styles.link} url={bill.detailsUrl} label='View Details' iconName='info-circle' />
        <BillLink style={styles.link} url={bill.fullTextUrl} label='View Bill' iconName='file-text-o' />
      </div>
      {bill.summary && <div className={css(styles.summary)}>{bill.summary}</div>}
    </div>
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
  link: {
    marginRight: 10
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
        detailsUrl
        fullTextUrl
        hearing {
          date
        }
      }
    `
  }
})
