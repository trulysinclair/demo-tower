import { fromXml } from '#util/badgerfish/from_xml'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class XmlBodyparserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const rawBody = ctx.request.raw()

    if (!rawBody || !ctx.request.headers()['content-type']?.includes('application/xml')) {
      // Nothing to do
      return await next()
    }

    ctx.request.updateRawBody(JSON.stringify(await fromXml(rawBody)))

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
