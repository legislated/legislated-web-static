// @flow
import React, { Component } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Element } from './components'
import { colors, shadows, borders } from '../styles'
import { Link } from '../components'
import type { Viewer } from '../../types'

class BillView extends Component {
  props: {
    viewer: ?Viewer
  }

  render () {
    const { viewer } = this.props
    if (!viewer) {
      return <div>Loading...</div>
    }

    const { bill } = viewer
    const date = moment(bill.hearing.date)

    return <div className={css(styles.container)}>
      <Link style={styles.back} url='/' label='All Bills' iconName='chevron-left' />
      <div className={css(styles.bill)}>
        <div className={css(styles.header)}>
          <h1>{bill.title}</h1>
          <div className={css(styles.subheader)}>
            <h4 className={css(styles.number)}>{bill.documentNumber}</h4>
            <Link style={styles.link} url={bill.witnessSlipUrl} label='Take Action' iconName='pencil-square-o' />
            <Link style={styles.link} url={bill.detailsUrl} label='View Details' iconName='info-circle' />
            <Link url={bill.fullTextUrl} label='View Bill' iconName='file-text-o' />
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
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  back: {
    marginBottom: 10
  },
  bill: {
    ...shadows.low,
    ...borders.low,
    padding: 15,
    backgroundColor: colors.neutral
  },
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

export default Relay.createContainer(BillView, {
  initialVariables: {
    id: ''
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        bill(id: $id) {
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
      }
    `
  }
})
