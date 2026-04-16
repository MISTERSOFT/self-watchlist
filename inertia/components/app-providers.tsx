import { client, queryClient } from '@/client'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { themeStorageKey } from '@/constants'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { QueryClientProvider } from '@tanstack/react-query'

interface AppProvidersProps {
  children?: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TuyauProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey={themeStorageKey}>
          <TooltipProvider>
            <SidebarProvider defaultOpen={false}>
              <SidebarInset>{children}</SidebarInset>
              <AppSidebar side="right" />
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </TuyauProvider>
    </QueryClientProvider>
  )
}
