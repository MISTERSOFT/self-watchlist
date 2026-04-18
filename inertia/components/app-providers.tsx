import { AppSidebar } from '@/components/app-sidebar'
import { ImportMyAnimeListDialogProvider } from '@/components/import-my-anime-list-dialog-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { VideoPlayerDialogProvider } from '@/components/video-player-dialog-provider'

interface AppProvidersProps {
  children?: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <ImportMyAnimeListDialogProvider>
        <VideoPlayerDialogProvider>
          <SidebarInset>{children}</SidebarInset>
          <AppSidebar side="right" />
        </VideoPlayerDialogProvider>
      </ImportMyAnimeListDialogProvider>
    </SidebarProvider>
  )
}
