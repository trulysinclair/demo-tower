import { components } from './broadworks_xsi_events.schema.js'

export type XsiSubscriptionTerminatedEvent = components['schemas']['SubscriptionTerminatedEvent']
export type XsiCallSubscriptionEvent = components['schemas']['CallSubscriptionEvent']
export type XsiCallAnsweredEvent = components['schemas']['CallAnsweredEvent']

export type XsiEvent =
  | XsiSubscriptionTerminatedEvent
  | XsiCallSubscriptionEvent
  | XsiCallAnsweredEvent
