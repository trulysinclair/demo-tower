import { JsonObject } from '#util/badgerfish/types'

export function isValidChildProperty(node: JsonObject, key: string): boolean {
  return node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null
}
