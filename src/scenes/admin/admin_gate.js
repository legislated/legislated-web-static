// @flow
import React, { Component } from 'react'
import { Base64 } from 'js-base64'
import { session } from 'shared/storage'
import { environment } from '../../relay'

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

  formSubmit = (event: { preventDefault: Function }) => {
    event.preventDefault()
    const { username, password } = this.state
    const authValue = Base64.encode(`${username}:${password}£`)
    const authHeader = `Basic ${authValue}`
    environment.recreate({ Authorization: authHeader })
    session.set('@@legislated/admin-header', authHeader)
  }

  // lifecycle
  render () {
    const hasAdminHeader = !!session.get('@@legislated/admin-header')

    return <div>
      {hasAdminHeader ? this.props.children : this.renderSignInForm()}
    </div>
  }

  renderSignInForm (): React$Element<*> {
    return <form onSubmit={this.formSubmit} >
      <input name='username' onChange={this.didUpdateField} />
      <input type='password' name='password' onChange={this.didUpdateField} />
      <input type='submit' />
    </form>
  }
}
