import { isValidChildProperty } from '#util/badgerfish/is_valid_child_property'
import { JsonObject } from '#util/badgerfish/types'

export function hasChildProperties(node: JsonObject): boolean {
  if (typeof node !== 'object' || node === null) {
    return false
  }

  const typedNode = node as JsonObject

  for (let key in typedNode) {
    if (isValidChildProperty(typedNode, key)) {
      return true
    }
  }

  return false
}
