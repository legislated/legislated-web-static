// @flow
type FontFace = {
  fontFamily: string,
  fontWeight?: string
}

const fontFamily = 'sans-serif'
const fonts: { [key: string]: FontFace } = {
  regular: {
    fontFamily
  },
  medium: {
    fontFamily,
    fontWeight: 'bold'
  }
}

export default fonts
