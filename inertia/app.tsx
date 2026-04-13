import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/layouts/default'
import string from '@adonisjs/core/helpers/string'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { createInertiaApp } from '@inertiajs/react'
import { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { client } from './client'
import './css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Self Watchlist'
const themeStorageKey = `${string.snakeCase(appName)}-ui-theme`

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => <Layout children={page} />
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey={themeStorageKey}>
          <App {...props} />
        </ThemeProvider>
      </TuyauProvider>
    )
  },
  progress: {
    color: 'var(--primary)', //'#ca3500',
  },
})
