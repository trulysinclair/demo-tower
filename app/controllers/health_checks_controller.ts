import HealthCheckReportCreated from '#events/health_check_report_created'
import { healthChecks } from '#start/health'
import type { HttpContext } from '@adonisjs/core/http'

export default class HealthChecksController {
  async handle({ response, logger }: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      logger.info('Health Check passed')
      await HealthCheckReportCreated.dispatch(report)
      return response.status(200).send(report)
    }

    await HealthCheckReportCreated.dispatch(report)
    logger.error('Health Check failed')
    return response.serviceUnavailable(report)
  }
}
