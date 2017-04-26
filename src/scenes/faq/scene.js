// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from 'shared/components'

export class FaqView extends Component {
  render () {
    return <div>
      <h1>FAQs</h1>
      <h2 className={css(styles.question)}>What is a witness slip?</h2>
      <p className={css(styles.paragraph)}>
        Witness slips are a way to voice your support for or opposition to a
        particular piece of legislation. Before legislation is heard in committee,
        citizens can submit witness slips to register their opinions.
        They are read out in the committee hearings, and we’ve heard from a staffer
        that legislators have noticed the influx of slips!
        Witness slips were especially influential for getting
        &nbsp;<Link to='http://www.ilga.gov/legislation/billstatus.asp?DocNum=40&GAID=14&GA=100&DocTypeID=HB&LegID=99242&SessionID=91'>HB40</Link>&nbsp;
        passed in committee, so they do work! Let’s keep it up!
      </p>
      <p className={css(styles.paragraph)}>
        <strong>If you feel strongly about a bill, it is vitally important that you call
        and visit your ILGA Rep and Senator, and ask your friends to do the same.</strong>
        The slips are only seen/counted by a very small group of ILGA members to
        move the bill out of committee, but your reps must hear from you.
        It is the most effective way to influence them.
      </p>
      <p className={css(styles.paragraph)}>
        If you are not sure who your ILGA members are look them up
        &nbsp;<Link to='https://ova.elections.il.gov/RegistrationLookup.aspx'>here</Link>.
      </p>
      <p className={css(styles.paragraph)}>
        Then find their contact information here:
        &nbsp;<Link to='http://ilga.gov/house/'>House</Link>
        &nbsp;<Link to='http://ilga.gov/senate/'>Senate</Link>
      </p>
      <p className={css(styles.paragraph)}>
        <strong>Thank you for making some amazing things happen here in Illinois.</strong>
      </p>
      <h2 className={css(styles.question)}>When is the deadline?</h2>
      <p className={css(styles.paragraph)}>
        The Senate allows you to submit a witness slip up to the end of the day
        of the committee hearing&#39;s scheduled date.
      </p>
      <p className={css(styles.paragraph)}>
        The House allows you to submit a witness slip up to the conclusion of
        the committee hearing.
      </p>
      <h2 className={css(styles.question)}>Where do I fill out witness slips?</h2>
      <p className={css(styles.paragraph)}>
        Witness slips can be filled out on the
        &nbsp;<Link to='http://my.ilga.gov'>Illinois General Assembly&#39;s Dashboard</Link>.
      </p>
      <h2 className={css(styles.question)}>How do I complete a witness slip?</h2>
      <p className={css(styles.paragraph)}>
        <iframe width='560' height='315' src='https://www.youtube.com/embed/6SaODB11-AA' frameborder='0' allowfullscreen />
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
      <h2 className={css(styles.question)}>How do I create an account?</h2>
      <p className={css(styles.paragraph)}>
        <strong>Creating an account is HIGHLY recommended!</strong> If you have an account,
        you’ll only have to choose proponent/opponent for any slip that you fill out.
        You’ll also be able to keep track of the slips you’ve created.
        <ol>
          <li>Go to the &nbsp;<Link to='http://my.ilga.gov'>Illinois General Assembly&#39;s Dashboard</Link></li>
          <li>In the left sidebar, select REGISTER</li>
          <li>Enter email and password</li>
          <li>Check Agree to Terms</li>
          <li>Click Register</li>
          <li>You will receive a confirmation email. Follow the link to verify your account and enter your profile information.</li>
        </ol>
        The next time you select a Witness Slip, all of your information will be
        prepopulated, and you will only need to select Proponent or Opponent.
      </p>
      <p className={css(styles.paragraph)}>
        More detailed instructions are available in the
        &nbsp;<Link to='http://my.ilga.gov/Documents/ILGA%20Dashboard%20User%20Guide.pdf'>ILGA Witness Slip User Guide</Link>.
      </p>
      <h2 className={css(styles.question)}>Why am I filling out a slip for the same bill each week?</h2>
      <p className={css(styles.paragraph)}>
        If a bill isn’t called at a committee meeting, you have to refile one
        for the new hearing date.
      </p>
      <h2 className={css(styles.question)}>Where can I go for more help?</h2>
      <p className={css(styles.paragraph)}>
        For more information please checkout
        &nbsp;<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link> on Facebook or
        &nbsp;<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link> on Twitter. Questions? Please ask!
      </p>
      <h2 className={css(styles.question)}>How can I get involved?</h2>
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
  question: {
    marginTop: 5,
    marginBottom: 5,
    color: '#00008b'
  },
  paragraph: {
    marginBottom: 10,
    marginLeft: 15
  }
})
