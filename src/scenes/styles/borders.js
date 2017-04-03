// @flow
import { colors } from './colors'

type BorderStyle = {|
  border: string,
|}

function make (color: string): BorderStyle {
  return {
    border: `1px solid ${color}`
  }
}

export const borders = {
  make,
  low: make(colors.neutralShadow),
  high: make(colors.primary)
}
