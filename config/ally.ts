import env from '#start/env'
import { defineConfig } from '@adonisjs/ally'
import { entraId } from '@tiotbenjy/ally-entra-id'

const allyConfig = defineConfig({
  entra: entraId({
    driver: 'entra',
    clientId: env.get('ENTRA_ID_CLIENT_ID'),
    clientSecret: env.get('ENTRA_ID_CLIENT_SECRET'),
    callbackUrl: env.get('ENTRA_ID_CALLBACK_URL'),
    authorizationEndpoint: env.get('ENTRA_ID_AUTH_ENDPOINT'),
    scopes: ['openid', 'email'],
    // tenantId not required if authorizationEndpoint is :
    // 'common' or 'organizations' or 'consumers'
    tenantId: env.get('ENTRA_ID_TENANT_ID'),
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
