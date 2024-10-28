import { toBadgerfish } from '#util/badgerfish/to_badgerfish'
import { JsonObject } from '#util/badgerfish/types'
import { Parser } from 'xml2js'

/**
 * Convert XML to Badgerfish JSON convention
 * @param {string} xml
 * @returns {Promise<JsonObject>}
 */
export async function fromXml(xml: string) {
  const node: JsonObject = await new Parser({
    explicitArray: false,
    trim: true,
    normalize: true,
    preserveChildrenOrder: true,
    tagNameProcessors: [
      (tagName) => {
        if (tagName.startsWith('xsi:')) {
          return tagName.replace('xsi:', '')
        }

        return tagName
      },
    ],
  }).parseStringPromise(xml)

  return toBadgerfish(node)
}
