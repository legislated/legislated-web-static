// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from 'shared/components'

export class AboutView extends Component {
  render () {
    return <div>
    <p>Legislated has been developed by a&nbsp;
    <a href='https://chihacknight.org' target='_blank'>
      ChiHackNight
    </a> breakout group to make it easier for Illinois residents
    to take advantage of the Witness Slip functionality provided by
    the State of Illinois.</p>
    <br/>
    <p>We’re a group of volunteers who want to make civic engagement
    at the state level more user-friendly. We try to make it easy for
    Illinois residents to voice their opinions on proposed legislation
    via witness slips.</p>
    <br/>
    <p>For more information please checkout&nbsp;
    <a href='https://www.facebook.com/groups/WitnessSlipProjectIllinois/' target='_blank'>
      The Witness Slip Project (Illinois)
    </a> on Facebook or&nbsp;
    <a href='https://twitter.com/WitnessSlipsIL' target='_blank'>
      @WitnessSlipsIL
    </a> on Twitter. Questions? Please ask!</p>
    <br/>
    <p>To get involved,&nbsp;
    <a href='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097' target='_blank'>
      register here
    </a> to attend a ChiHackNight meeting or join our&nbsp;
    <a href='https://www.facebook.com/groups/248218992302984/' target='_blank'>
      Facebook Working Group
    </a>.</p>
    </div>
  }

}

const styles = StyleSheet.create({
  link: {
    fontSize: 16
  },
  icon: {
    textAlign: 'center'
  },
  label: {
    marginLeft: 5
  }
})
