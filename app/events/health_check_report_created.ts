import { BaseEvent } from '@adonisjs/core/events'
import { HealthCheckReport } from '@adonisjs/core/types/health'

export default class HealthCheckReportCreated extends BaseEvent {
  /**
   * Accept event data as constructor parameters
   */
  constructor(public report: HealthCheckReport) {
    super()
  }
}
