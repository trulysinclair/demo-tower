import HealthCheckReportCreated from '#events/health_check_report_created'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class HealthCheckReport extends BaseCommand {
  static commandName = 'health-check'
  static description = 'Generate health check report'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const { healthChecks } = await import('#start/health')
    const report = await healthChecks.run()
    await HealthCheckReportCreated.dispatch(report)
  }
}
