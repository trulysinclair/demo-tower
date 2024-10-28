import SocketIoService from '#services/socket_io_service'
import XsiSubscriptionEventService from '#services/xsi_subscription_event_service'
import XsiUserEventService from '#services/xsi_user_event_service'
import type { ApplicationService } from '@adonisjs/core/types'

export default class SocketIoProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {
    this.app.container.singleton(SocketIoService, async (resolver) => {
      const xsiUserEventService = await resolver.make(XsiUserEventService)
      const xsiSubscriptionEventService = await resolver.make(XsiSubscriptionEventService)

      return new SocketIoService(xsiUserEventService, xsiSubscriptionEventService)
    })
  }

  /**
   * The process has been started
   */
  async ready() {
    await this.app.container.make(SocketIoService)
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
