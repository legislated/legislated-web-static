export function toMatchClassName (enzymeWrapper, pattern) {
  let actual = '(none)'
  let pass = false

  // handle different lengths of enzymeWrappers
  switch (enzymeWrapper.nodes.length) {
    case 0:
      break // this will and should fail the test
    case 1:
      actual = enzymeWrapper.prop('className')
      pass = actual.match(pattern) != null
      break
    default:
      let allMatch = true

      enzymeWrapper.forEach(node => {
        actual = node.prop('className')
        if (!actual.match(pattern)) {
          allMatch = false
        }
      })

      pass = allMatch
  }

  // generate output
  const message = pass
    ? () => this.utils.matcherHint('.not.toBe') + '\n\n' +
      `Expected class name to not match (using 'match')\n` +
      `  ${this.utils.printExpected(pattern)}\n` +
      `Received:\n` +
      `  ${this.utils.printReceived(actual)}`
    : () => this.utils.matcherHint('.toBe') + '\n\n' +
      `Expected class name to match (using 'match')\n` +
      `  ${this.utils.printExpected(pattern)}\n` +
      `Received:\n` +
      `  ${this.utils.printReceived(actual)}`

  return { pass, message }
}
