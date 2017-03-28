// @flow
import React from 'react'
import { render } from 'react-dom'
import { Container } from './scenes'
import { createRelayEnvironment } from './relay/environment'

// bootstrap relay
createRelayEnvironment()
// render application
render(<Container />, document.getElementById('root'))
