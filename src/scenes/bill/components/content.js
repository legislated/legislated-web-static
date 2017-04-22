// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Element } from '../components'
import { Button } from 'shared/components'
import { colors } from 'shared/styles'
import type { Bill } from 'shared/types'

const { floor } = Math

class Content extends Component {
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
      <div className={css(styles.header)}>
        <h1>{bill.title}</h1>
        <h4>{bill.documentNumber}</h4>
      </div>
      <div className={css(styles.body)}>
        <div className={css(styles.column)}>
          <Element label='State Synopsis'><p>{bill.summary}</p></Element>
        </div>
        <div className={css(styles.spacer)} />
        <div className={css(styles.column)}>
          <Element style={styles.date} label='Hearing Date'>
            <p>
              <span>{date.calendar()}</span>
              {hoursLeft < 24 && <span className={css(styles.hoursLeft)}>
                {`(${hoursLeft} hours left)`}
              </span>}
            </p>
          </Element>
          <Element label='Committee'><p>{bill.committee.name}</p></Element>
        </div>
      </div>
      <div className={css(styles.actions)}>
        <Button style={styles.link} to={bill.witnessSlipUrl} label='Take Action' iconName='pencil-square-o' type='solid' />
        <Button style={styles.link} to={bill.detailsUrl} label='View Details' iconName='info-circle' />
        <Button to={bill.fullTextUrl} label='View Bill' iconName='file-text-o' />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 15
  },
  body: {
    display: 'flex',
    flexBasis: 0,
    marginBottom: 15
  },
  column: {
    flex: 1
  },
  date: {
    marginBottom: 10
  },
  hoursLeft: {
    marginLeft: 5,
    color: colors.secondary
  },
  spacer: {
    width: 30
  },
  actions: {
    display: 'flex'
  },
  link: {
    marginRight: 10
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
