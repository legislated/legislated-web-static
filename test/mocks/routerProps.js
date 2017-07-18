/* globals jest */
export function reset () {
  const { history } = routerProps
  routerProps.history = {
    ...history,
    action: 'PUSH'
  }
}

export const routerProps = {
  history: {
    action: 'placeholder',
    replace: jest.fn()
  }
}
