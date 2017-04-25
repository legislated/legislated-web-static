import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from 'shared/components'

export class FAQView extends Component {
  render () {
    return <div>
    <h2>What is a witness slip?</h2>
    <p>Witness slips are a way to voice your support or opposition for a
    particular piece of legislation. Before legislation is heard in committee,
    citizens can submit witness slips to register their opinions.
    They are read out in the committee hearings, and we’ve heard from a staffer
    that legislators have noticed the influx of slips!
    Witness slips were especially influential for getting&nbsp;
    <a href='http://www.ilga.gov/legislation/billstatus.asp?DocNum=40&GAID=14&GA=100&DocTypeID=HB&LegID=99242&SessionID=91' target='_blank'>
      HB40</a> passed in committee, so they do work! Let’s keep it up!
    </p>
    <br/>
    <p><strong>If you feel strongly about a bill, it is vitally important that you call
    and visit your ILGA Rep and Senator, and ask your friends to do the same.</strong>
    The slips are only seen/counted by a very small group of ILGA members to
    move the bill out of committee, but your reps must hear from you.
    It is the most effective way to influence them.</p>
    <br/>
    <p>If you are not sure who your ILGA members are look them up
    &nbsp;<a href='https://ova.elections.il.gov/RegistrationLookup.aspx' target='_blank'>
      here</a>.
    </p>
    <p>Then find their contact information here:
    &nbsp;<a href='http://ilga.gov/house/' target='_blank'>House</a>
    &nbsp;&nbsp;&nbsp;<a href='http://ilga.gov/senate/' target='_blank'>Senate</a>
    </p>
    <br/>
    <p><strong>Thank you for making some amazing things happen here in Illinois.</strong></p>
    <br/>
    <h2>When is the deadline?</h2>
    <p>The Senate allows you to submit a witness slip up to the end of the day
    of the committee hearing&#39;s scheduled date.</p>
    <p>The House allows you to submit a witness slip up to the conclusion of
    the committee hearing.</p>
    <br/>
    <h2>Where do I fill out witness slips?</h2>
    <p>Witness slips can be filled out on the &nbsp;
    <a href='http://my.ilga.gov' target='_blank'>
    Illinois General Assembly&#39;s Dashboard</a>.
    </p>
    <br/>
    <h2>How do I complete a witness slip?</h2>
    <p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/6SaODB11-AA" frameborder="0" allowfullscreen></iframe>
      <ol>
        <li>Fill out your personal identification information</li>
        <li>For firm/business or agency, enter your organization or SELF</li>
        <li>Enter your job title or SELF in the Title field</li>
        <li>In the representation section, enter SELF</li>
        <li>Check PROPONENT or OPPONENT in the position section</li>
        <li>Check the box marked RECORD OF APPEARANCE ONLY in the testimony section</li>
        <li>Enter CAPTCHA and agree to terms of service</li>
        <li>Create slip</li>
      </ol>
    </p>
    <br/>
    <h2>How do I create an account?</h2>
    <p>Creating an account is HIGHLY recommended! If you have an account,
    you’ll only have to choose proponent/opponent for any slip that you fill out.
    You’ll also be able to keep track of the slips you’ve created.
    <ol>
      <li>Go to the &nbsp;
      <a href='http://my.ilga.gov' target='_blank'>
      Illinois General Assembly&#39;s Dashboard</a></li>
      <li>In the left sidebar, select REGISTER</li>
      <li>Enter email and password</li>
      <li>Check Agree to Terms</li>
      <li>Click Register</li>
      <li>You will receive a confirmation email. Follow the link to verify your account and enter your profile information.</li>
    </ol>
    The next time you select a Witness Slip, all of your information will be
    prepopulated, and you will only need to select Proponent or Opponent.
    </p>
    <br/>
    <p>More detailed instructions are available in the
    &nbsp;<a href='http://my.ilga.gov/Documents/ILGA%20Dashboard%20User%20Guide.pdf' target='_blank'>
      ILGA Witness Slip User Guide</a>.
    </p>
    <br/>
    <h2>Why am I filling out a slip for the same bill each week?</h2>
    <p>If a bill isn’t called at a committee meeting, you have to refile one
    for the new hearing date.</p>
    <br/>
    <h2>Where can I go for more help?</h2>
    <p>For more information please checkout&nbsp;
    <a href='https://www.facebook.com/groups/WitnessSlipProjectIllinois/' target='_blank'>
      The Witness Slip Project (Illinois)
    </a> on Facebook or&nbsp;
    <a href='https://twitter.com/WitnessSlipsIL' target='_blank'>
      @WitnessSlipsIL
    </a> on Twitter. Questions? Please ask!</p>
    <br/>
    <h2>How can I get involved?</h2>
    <p>To get involved,&nbsp;
    <a href='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097' target='_blank'>
      register here
    </a> to attend a ChiHackNight meeting or join our&nbsp;
    <a href='https://www.facebook.com/groups/248218992302984/' target='_blank'>
      Facebook Working Group
    </a>.</p>
    <br/>
    <h2></h2>
    <p></p>
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
