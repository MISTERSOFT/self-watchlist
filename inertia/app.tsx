import { AppProviders } from '@/components/app-providers'
import { appName } from '@/constants'
import Layout from '@/layouts/default'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { Data } from '@generated/data'
import { createInertiaApp } from '@inertiajs/react'
import { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import './css/app.css'


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
      <AppProviders>
        <App {...props} />
      </AppProviders>
    )
  },
  progress: {
    color: 'var(--primary)',
  },
})
