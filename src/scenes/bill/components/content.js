// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Element } from '../components'
import { Link } from '../../components'
import type { Bill } from '../../../types'

class Content extends Component {
  props: {
    bill: Bill
  }

  render () {
    const { bill } = this.props
    const date = moment(bill.hearing.date)

    return <div>
      <div className={css(styles.header)}>
        <h1>{bill.title}</h1>
        <div className={css(styles.subheader)}>
          <h4 className={css(styles.number)}>{bill.documentNumber}</h4>
          <Link style={styles.link} to={bill.witnessSlipUrl} label='Take Action' iconName='pencil-square-o' />
          <Link style={styles.link} to={bill.detailsUrl} label='View Details' iconName='info-circle' />
          <Link to={bill.fullTextUrl} label='View Bill' iconName='file-text-o' />
        </div>
      </div>
      <div className={css(styles.body)}>
        <div className={css(styles.column)}>
          <Element label='State Synopsis' value={bill.summary} />
        </div>
        <div className={css(styles.spacer)} />
        <div className={css(styles.column)}>
          <Element style={styles.date} label='Hearing Date' value={date.calendar()} />
          <Element label='Committee' value={bill.committee.name} />
        </div>
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 15
  },
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  number: {
    marginRight: 10
  },
  link: {
    marginRight: 10
  },
  body: {
    display: 'flex',
    flexBasis: 0
  },
  column: {
    flex: 1
  },
  date: {
    marginBottom: 10
  },
  spacer: {
    width: 30
  }
})

export default Relay.createContainer(Content, {
  fragments: {
    bill: () => Relay.QL`
      fragment on Bill {
        documentNumber
        title
        summary
        sponsorName
        detailsUrl
        fullTextUrl
        witnessSlipUrl
        hearing {
          date
        }
        committee {
          name
        }
        chamber {
          name
        }
      }
    `
  }
})
