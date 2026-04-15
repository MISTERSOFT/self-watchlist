import { client, queryClient } from '@/client'
import { ThemeProvider } from '@/components/theme-provider'
import { themeStorageKey } from '@/constants'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { QueryClientProvider } from '@tanstack/react-query'

interface AppProvidersProps {
  children?: React.ReactNode,
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TuyauProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey={themeStorageKey}>
          {children}
        </ThemeProvider>
      </TuyauProvider>
    </QueryClientProvider>
  )
}
