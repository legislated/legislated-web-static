// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from 'shared/components'

export class AboutView extends Component {
  render () {
    return <div>
      <h1>About Us</h1>
      <p className={css(styles.paragraph)}>
        Legislated has been developed by a
        &nbsp;<Link to='https://chihacknight.org'>Chi Hack Night</Link>&nbsp;
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
        &nbsp;<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link>&nbsp;
        on Facebook or
        &nbsp;<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>&nbsp;
        on Twitter. Questions? Please ask!
      </p>
      <p className={css(styles.paragraph)}>
        To get involved,
        &nbsp;<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>&nbsp;
        to attend a ChiHackNight meeting or join our
        &nbsp;<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
      </p>
    </div>
  }
}

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 15
  }
})
