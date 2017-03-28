// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import { StyleSheet, css } from 'aphrodite/no-important'
import fonts from '../../fonts'
import type { Bill } from '../../../types'

class BillCell extends Component {
  props: {
    bill: Bill
  }

  render () {
    const { bill } = this.props

    return <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <span className={css(styles.document)}>{bill.documentNumber}</span>
        <span>{bill.title}</span>
      </div>
      <div className={css(styles.date)}>{bill.hearing.date}</div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  header: {
    ...fonts.regular
  },
  document: {
    ...fonts.medium
  },
  date: {
    ...fonts.regular
  }
})

export default Relay.createContainer(BillCell, {
  fragments: {
    bill: () => Relay.QL`
      fragment on Bill {
        id
        title
        documentNumber
        hearing {
          date
        }
      }
    `
  }
})
