// @flow
import { mapValues } from 'lodash'
import { css } from 'glamor'
import type { RuleDefinition, RuleProp } from 'glamor' // eslint-disable-line

type RuleDefinitionMap = { [key: string]: RuleDefinition }
type RulePropMap = { [key: string]: RuleProp }

export function stylesheet (definitions: RuleDefinitionMap): RulePropMap {
  return mapValues(definitions, (definition) => {
    return css(definition)
  })
}
