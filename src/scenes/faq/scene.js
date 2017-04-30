// @flow
import React, { Component } from 'react'
import { Question } from './question'
import { Link } from 'shared/components'
import { stylesheet, colors, shadows, borders, mobile } from 'shared/styles'

export class FaqView extends Component {
  render () {
    return <div {...rules.container}>
      <div {...rules.content}>
        <h1>FAQ</h1>
        <Question title='What is a witness slip?'>
          <p>
            Witness slips are a way to voice your support for or opposition to a
            particular piece of legislation. Before legislation is heard by a
            committee, citizens can submit slips to register their opinions. The
            slips are then read during the committee hearings, and we’ve heard
            from staffers that legislators have noticed the influx in participation!
            Witness slips were especially influential for getting
            {' '}<Link to='http://www.ilga.gov/legislation/billstatus.asp?DocNum=40&GAID=14&GA=100&DocTypeID=HB&LegID=99242&SessionID=91'>HB40</Link>{' '}
            passed in committee, so they do work! Let’s keep it up!
          </p>
          <p>
            <strong>If you feel strongly about a bill, it is vitally important
            that you call and/or visit your ILGA Representative and
            Senator.</strong> Ask your friends to do the same! Slips are counted
            by a small group of ILGA members to move the bill out of committee,
            but your reps need to hear from you. It is by far the most effective
            way to influence them.
          </p>
          <p>
            If you are not sure who your representatives are, look them up
            {' '}<Link to='https://ova.elections.il.gov/RegistrationLookup.aspx'>here</Link>{' '}
            and find their contact information either in the
            {' '}<Link to='http://ilga.gov/house/'>House</Link>{' '}
            or
            {' '}<Link to='http://ilga.gov/senate/'>Senate</Link>
            .
          </p>
          <p>
            <strong>Thank you for making amazing things happen in Illinois.</strong>
          </p>
        </Question>
        <Question title='When is the deadline?'>
          <p>
            The Senate allows you to submit a witness slip until the end of the
            day of the committee hearing&#39;s scheduled date.
          </p>
          <p>
            The House allows you to submit a witness slip until the conclusion of
            the committee hearing.
          </p>
        </Question>
        <Question title='Where do I fill out witness slips?'>
          <p>
            For any bill on this site, the 'Take Action' link will open a form that
            you can use to submit the correct witness slip. If you cannot find a bill
            here, you can try to find it on the
            {' '}<Link to='http://my.ilga.gov'>Illinois General Assembly&#39;s Dashboard</Link>.
          </p>
        </Question>
        <Question title='How do I complete a witness slip'>
          <div>
            <div {...rules.video}>
              <iframe {...rules.iframe}
                width='560'
                height='315'
                src='https://www.youtube.com/embed/6SaODB11-AA'
                frameBorder='0'
                allowFullScreen />
            </div>
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
          </div>
        </Question>
        <Question title='How do I create an account'>
          <div>
            <strong>Creating an account is HIGHLY recommended!</strong> If you have an account,
            you’ll only have to choose proponent/opponent for any slip that you fill out.
            You’ll also be able to keep track of the slips you’ve created.
            <ol>
              <li>Go to the {' '}<Link to='http://my.ilga.gov'>Illinois General Assembly&#39;s Dashboard</Link></li>
              <li>In the left sidebar, select REGISTER</li>
              <li>Enter email and password</li>
              <li>Check Agree to Terms</li>
              <li>Click Register</li>
              <li>You will receive a confirmation email. Follow the link to verify your account and enter your profile information.</li>
            </ol>
            The next time you select a Witness Slip, all of your information will be
            prepopulated, and you will only need to select Proponent or Opponent.
          </div>
          <p>
            More detailed instructions are available in the
            {' '}<Link to='http://my.ilga.gov/Documents/ILGA%20Dashboard%20User%20Guide.pdf'>ILGA Witness Slip User Guide</Link>.
          </p>
        </Question>
        <Question title='Why am I filling out a slip for the same bill each week?'>
          <p>
            If a bill isn’t called at a committee meeting, you have to refile one
            for the new hearing date.
          </p>
        </Question>
        <Question title='Where can I go for more help?'>
          <p>
            For more information please checkout
            {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link> on Facebook or
            {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link> on Twitter. Questions? Please ask!
          </p>
        </Question>
        <Question title='How can I get involved?'>
          <p>
            To get involved,
            {' '}<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>{' '}
            to attend a Chi Hack Night meeting or join our
            {' '}<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
          </p>
        </Question>
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...shadows.low,
    ...borders.low(),
    padding: 15,
    backgroundColor: colors.neutral,
    ' p:not(:last-of-type)': {
      marginBottom: 10
    }
  },
  video: {
    ...mobile({
      position: 'relative',
      paddingBottom: '50%',
      paddingTop: 30,
      height: 0,
      overflow: 'hidden'
    })
  },
  iframe: {
    ...mobile({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
  }
})
