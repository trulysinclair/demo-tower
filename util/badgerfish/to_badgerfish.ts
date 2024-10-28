import { JsonObject } from '#util/badgerfish/types'

// TODO redo this in stages. i.e. handle namespaces, then values, then arrays, etc.
export function toBadgerfish(node: JsonObject) {
  if (typeof node !== 'object' || node === null) return node

  let badgerfishNode: JsonObject = {}

  for (let key in node) {
    if (node.hasOwnProperty(key)) {
      // handle array
      if (Array.isArray(node[key])) {
        badgerfishNode[key] = (node[key] as Array<JsonObject>).map((i) => {
          if (typeof i !== 'object') {
            return {
              $: toBadgerfish(i),
            }
          } else return toBadgerfish(i)
        })
      }
      // handle child object
      else if (typeof node[key] === 'object') {
        // handle attributes
        if (key === '$') {
          const namespace = {}

          // go through each attribute, replacing the object for independent
          // attributes prefixed with the "@" character
          for (const attribute in node[key] as JsonObject) {
            if (!attribute.includes('xmlns')) {
              // @ts-ignore
              badgerfishNode[`@${attribute}`] = node[key][attribute]
            } else {
              // append default namespace
              if (attribute === 'xmlns') {
                Object.assign(namespace, {
                  // @ts-ignore
                  $: node[key][attribute],
                })
              }
              // append named namespaces
              else
                Object.assign(namespace, {
                  // @ts-ignore
                  [attribute.replace('xmlns:', '')]: node[key][attribute],
                })
            }
          }
          if (!Object.entries(namespace).length) {
            // noop
          } else badgerfishNode['@xmlns'] = namespace
        }
        // handle child objects
        else badgerfishNode[key] = toBadgerfish(node[key] as JsonObject)
      }
      // Xml2Js puts text under "_", so put it in "$"
      else if (key === '_') {
        badgerfishNode['$'] = node[key]
      }
      // set values in "$"
      else {
        // handle text or attribute
        badgerfishNode[key] = { $: node[key] }
      }
    }
  }

  return badgerfishNode
}
