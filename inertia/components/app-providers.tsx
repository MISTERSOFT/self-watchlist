import { ImportMyAnimeListDialogProvider } from '@/components/import-my-anime-list-dialog-provider'
import { MediaDetailsSidebar } from '@/components/media-details-sidebar'
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
          <MediaDetailsSidebar side="right" />
        </VideoPlayerDialogProvider>
      </ImportMyAnimeListDialogProvider>
    </SidebarProvider>
  )
}
