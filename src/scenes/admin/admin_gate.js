// @flow
import React, { Component } from 'react'
import { Button } from 'shared/components'
import { stylesheet } from 'shared/styles'
import { auth } from 'shared/auth'

export class AdminGate extends Component {
  props: {
    children?: any
  }

  state = {
    username: '',
    password: ''
  }

  didUpdateField = (event: { target: { name: string, value: string } }) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  didClickSignIn = () => {
    const { username, password } = this.state
    auth.signIn(username, password)
  }

  // lifecycle
  render () {
    return auth.isSignedIn ? this.renderAdminContent() : this.renderSignInForm()
  }

  renderSignInForm (): React$Element<*> {
    return <div {...rules.container}>
      <form {...rules.form}>
        <h2>Administration Sign In</h2>
        <label htmlFor='username'>Username</label>
        <input name='username' onChange={this.didUpdateField} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' onChange={this.didUpdateField} />
        <Button styles={rules.action} label='Sign In' iconName='sign-in' onClick={this.didClickSignIn} />
      </form>
    </div>
  }

  renderAdminContent (): React$Element<*> {
    return <div>
      <Button label='Sign Out' iconName='sign-out' onClick={auth.signOut} />
      {this.props.children}
    </div>
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '> input': {
      marginBottom: 10
    }
  }
})
