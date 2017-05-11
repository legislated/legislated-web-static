/* eslint-env jest */
import 'jest-enzyme/lib'
import * as mocks from './mocks'
import * as matchers from './matchers'

expect.extend(matchers)

beforeEach(() => {
  jest.clearAllMocks()
  mocks.reset()
})
