// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import moment from 'moment'
import { Button } from 'shared/components'
import { fonts, colors, shadows, borders, utils } from 'shared/styles'
import type { Bill } from 'shared/types'

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
      <div className={css(styles.info)}>
        <div className={css(styles.header)}>
          <div className={css(styles.document)}>
            <h3 className={css(styles.title)}>{bill.title}</h3>
            <span className={css(styles.number)}>{bill.documentNumber}</span>
          </div>
          <p>{date.calendar()}</p>
        </div>
        {bill.summary && <p className={css(styles.summary)}>{bill.summary}</p>}
      </div>
      <div className={css(styles.actions)}>
        <Button
          type='solid'
          style={styles.button}
          to={bill.witnessSlipUrl}
          label='Take Action'
          iconName='pencil-square-o' />
        <Button
          style={[styles.button, styles.lastButton]}
          to={`bill/${bill.id}`}
          label='Bill Details'
          iconName='file-text-o' />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    ...shadows.low,
    ...borders.low(),
    display: 'flex',
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral,
    ...utils.mobile({
      flexDirection: 'column'
    })
  },
  last: {
    margin: 0
  },
  info: {
    ...borders.low(['right']),
    flex: 1,
    paddingRight: 15,
    ...utils.mobile({
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
    marginBottom: 5
  },
  title: {
    ...fonts.bold,
    display: 'inline-block',
    marginRight: 10
  },
  number: {
    display: 'inline-block',
    marginRight: 10
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 15,
    ...utils.mobile({
      flexDirection: 'row',
      paddingLeft: 0
    })
  },
  button: {
    width: 200,
    marginBottom: 10,
    ...utils.mobile({
      flex: 1,
      width: 'auto',
      marginBottom: 0,
      marginRight: 10
    })
  },
  lastButton: {
    marginBottom: 0,
    ...utils.mobile({
      marginRight: 0
    })
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
