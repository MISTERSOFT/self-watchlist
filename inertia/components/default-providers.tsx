import { client, queryClient } from '@/client'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { themeStorageKey } from '@/constants'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { QueryClientProvider } from '@tanstack/react-query'

interface DefaultProvidersProps {
  children?: React.ReactNode
}

export function DefaultProviders({ children }: DefaultProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TuyauProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey={themeStorageKey}>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </TuyauProvider>
    </QueryClientProvider>
  )
}
