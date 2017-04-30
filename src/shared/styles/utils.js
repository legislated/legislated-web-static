// @flow
export const utils = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  mobile (styles: Object): Object {
    return {
      '@media (maxWidth: 700px)': {
        ...styles
      }
    }
  }
}
