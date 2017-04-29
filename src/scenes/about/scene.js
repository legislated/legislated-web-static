// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from 'shared/components'
import { colors, shadows, borders } from 'shared/styles'

export class AboutView extends Component {
  render () {
    return <div className={css(styles.container)}>
      <div className={css(styles.content)}>
        <h1 className={css(styles.header)}>About Us</h1>
        <p className={css(styles.paragraph)}>
          Legislated has been developed by a
          {' '}<Link to='https://chihacknight.org'>Chi Hack Night</Link>{' '}
          breakout group to make it easier for Illinois residents
          to take advantage of the Witness Slip functionality provided by
          the State of Illinois.
        </p>
        <p className={css(styles.paragraph)}>
          We are a group of volunteers who want to make civic engagement
          at the state level more user-friendly. We try to make it easy for
          Illinois residents to voice their opinions on proposed legislation
          via witness slips.
        </p>
        <p className={css(styles.paragraph)}>
          For more information please checkout
          {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link>{' '}
          on Facebook or
          {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>{' '}
          on Twitter. Questions? Please ask!
        </p>
        <p>
          To get involved,
          {' '}<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>{' '}
          to attend a Chi Hack Night meeting or join our
          {' '}<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
        </p>
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...shadows.low,
    ...borders.low(),
    padding: 15,
    backgroundColor: colors.neutral
  },
  header: {
    ...borders.low(['bottom']),
    marginBottom: 15,
    paddingBottom: 15
  },
  paragraph: {
    marginBottom: 10
  }
})
