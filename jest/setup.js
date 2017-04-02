import { StyleSheetTestUtils } from 'aphrodite/no-important'

// set test env to development
process.env.ENVIRONMENT = 'development'
// disable aphrodite
StyleSheetTestUtils.suppressStyleInjection()
