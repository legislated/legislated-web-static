// @flow
import React from 'react'
import { render } from 'react-dom'
import { createRelayEnvironment } from './relay'
import { Container } from './scenes'

// bootstrap relay
createRelayEnvironment()
// render application
render(<Container />, document.getElementById('root'))
