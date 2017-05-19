// @flow
import React from 'react'
import { render } from 'react-dom'
import { createRelayEnvironment } from './relay'
import { AppRouter } from './navigation'

//require image files
require.context('../assets', true, /^\.\//)
// bootstrap relay
createRelayEnvironment()
// render application
render(<AppRouter />, document.getElementById('root'))
