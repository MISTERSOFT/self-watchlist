import { appName } from '@/constants'
import DefaultLayout from '@/layouts/default'
import UnauthLayout from '@/layouts/unauth'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { Data } from '@generated/data'
import { createInertiaApp } from '@inertiajs/react'
import { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import './css/app.css'
import './i18n'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => {
        switch (name) {
          case 'home':
            return <DefaultLayout children={page} />
          default:
            return <UnauthLayout children={page} />
        }
      }
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: 'var(--primary)',
  },
})
