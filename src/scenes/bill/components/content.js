// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Element } from '../components'
import { Button } from 'shared/components'
import { borders, colors, utils } from 'shared/styles'
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
        {bill.title && <h1 className={css(styles.title)}>{bill.title}</h1>}
        <h4>{bill.documentNumber}</h4>
      </div>
      <div className={css(styles.body)}>
        <div className={css(styles.column)}>
          <Element label='State Synopsis'><p>{bill.summary}</p></Element>
        </div>
        <div className={css(styles.spacer)} />
        <div className={css(styles.column, styles.lastColumn)}>
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
        <Button
          style={styles.button}
          to={bill.witnessSlipUrl}
          label='Take Action'
          iconName='pencil-square-o'
          type='solid' />
        <div className={css(styles.secondaryActions)}>
          <Button
            style={styles.button}
            to={bill.detailsUrl}
            label='View Details'
            iconName='info-circle' />
          <div className={css(styles.mobileSpacer)} />
          <Button
            style={styles.button}
            to={bill.fullTextUrl}
            label='View Bill'
            iconName='file-text-o' />
        </div>
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15
  },
  title: {
    ...utils.mobile({
      marginBottom: 5
    })
  },
  body: {
    ...borders.low(['bottom']),
    display: 'flex',
    flexBasis: 0,
    paddingBottom: 15,
    marginBottom: 15,
    ...utils.mobile({
      flexDirection: 'column'
    })
  },
  column: {
    flex: 1,
    ...utils.mobile({
      marginBottom: 15
    })
  },
  lastColumn: {
    ...utils.mobile({
      marginBottom: 0
    })
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
    display: 'flex',
    ...utils.mobile({
      flexDirection: 'column',
      alignItems: 'stretch'
    })
  },
  secondaryActions: {
    display: 'flex',
    ...utils.mobile({
      marginTop: 10
    })
  },
  button: {
    marginRight: 10,
    ...utils.mobile({
      flex: 1,
      marginRight: 0
    })
  },
  mobileSpacer: {
    ...utils.mobile({
      width: 15
    })
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
