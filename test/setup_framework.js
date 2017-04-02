/* eslint-env jest */
import 'jest-enzyme/lib'
import { toMatchClassName } from './matchers/to_match_class_name'

expect.extend({ toMatchClassName })
