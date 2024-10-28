import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// configDotenv({
//   path: './.env',
//   processEnv: import.meta.env,
// })

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    react(),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '@': `${getDirname(import.meta.url)}/inertia/lib`,
    },
  },
})
