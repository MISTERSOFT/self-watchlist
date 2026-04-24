import { client, queryClient } from '@/client'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { themeStorageKey } from '@/constants'
import i18n from '@/i18n'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'

interface DefaultProvidersProps {
  children?: React.ReactNode
}

export function DefaultProviders({ children }: DefaultProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TuyauProvider client={client}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider defaultTheme="dark" storageKey={themeStorageKey}>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </I18nextProvider>
      </TuyauProvider>
    </QueryClientProvider>
  )
}
