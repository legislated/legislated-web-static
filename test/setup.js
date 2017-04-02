import { StyleSheetTestUtils } from 'aphrodite/no-important'

// set test env to development
process.env.ENVIRONMENT = 'development'
// customize aphrodite
StyleSheetTestUtils.suppressStyleInjection()
