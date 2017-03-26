// @flow
import React from 'react'
import { render } from 'react-dom'
import { AppRouter } from './scenes'
import { createRelayEnvironment } from './relay/environment'

createRelayEnvironment()
render(<AppRouter />, document.getElementById('root'))
