// @flow
type FontFace = {
  fontFamily: string,
  fontWeight?: number | string
}

const fontFamily = 'Nunito, sans-serif'
export const fonts: { [key: string]: FontFace } = {
  regular: {
    fontFamily,
    fontWeight: 400
  },
  bold: {
    fontFamily,
    fontWeight: 700
  }
}
