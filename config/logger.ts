import env from '#start/env'
import { defineConfig, targets } from '@adonisjs/core/logger'

const callData = 'Event.eventData.call'
const callDataArray = 'Event.eventData.call[*]'

const loggerConfig = defineConfig({
  default: 'app',

  /**
   * The loggers object can be used to define multiple loggers.
   * By default, we configure only one logger (named "app").
   */
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      transport: {
        targets: targets()
          .push(targets.pretty())
          // .pushIf(app.inProduction, targets.file({ destination: `/var/log/apps/adonis/log` }))
          .push({
            target: 'pino-roll',
            level: 'info',
            options: {
              file: '/var/log/apps/adonis/log',
              frequency: 'daily',
              mkdir: true,
            },
          })
          .toArray(),
      },
      redact: {
        paths: [
          // single call
          `${callData}.callId.$`,
          `${callData}.callId.extTrackingId.$`,
          `${callData}.remoteParty.name.$`,
          `${callData}.remoteParty.address.$`,
          `${callData}.redirections.redirection.party.name.$`,
          `${callData}.redirections.redirection.party.name.$`,
          `${callData}.redirections.redirection.party.address.$`,
          `${callData}.redirections.redirection[*].party.address.$`,
          `${callData}.redirections.redirection[*].party.userId.$`,
          `${callData}.redirections.redirection[*].party.userId.$`,
          `${callData}.acdCallInfo.acdUserId.$`,
          `${callData}.acdCallInfo.acdName.$`,
          `${callData}.acdCallInfo.acdNumber.$`,
          `${callData}.acdCallInfo.callingPartyInfo.address.$`,
          // multiple calls
          `${callDataArray}.callId.$`,
          `${callDataArray}.callId.extTrackingId.$`,
          `${callDataArray}.remoteParty.name.$`,
          `${callDataArray}.remoteParty.address.$`,
          `${callDataArray}.redirections.redirection.party.name.$`,
          `${callDataArray}.redirections.redirection.party.name.$`,
          `${callDataArray}.redirections.redirection.party.address.$`,
          `${callDataArray}.redirections.redirection[*].party.address.$`,
          `${callDataArray}.redirections.redirection[*].party.userId.$`,
          `${callDataArray}.redirections.redirection[*].party.userId.$`,
          `${callDataArray}.acdCallInfo.acdUserId.$`,
          `${callDataArray}.acdCallInfo.acdName.$`,
          `${callDataArray}.acdCallInfo.acdNumber.$`,
          `${callDataArray}.acdCallInfo.callingPartyInfo.address.$`,
        ],
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
