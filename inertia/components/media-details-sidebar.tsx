import type { WatchStatus } from '#types/types'
import { MediaDetails } from '@/components/media-details'
import { MediaDetailsSkeleton } from '@/components/media-details-skeleton'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { InertiaProps } from '@/types'
import { Data } from '@generated/data'
import { router, usePage } from '@inertiajs/react'
import { X } from 'lucide-react'
import { type ComponentProps } from 'react'

type PageProps = InertiaProps<{
  selectedMedia: Data.AnimeDetail | undefined
  watchStatuses: WatchStatus[]
}>

export function MediaDetailsSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const page = usePage<PageProps>()

  const handleCloseSidebarClick = () => {
    // Go to '/' and remove query string in the URL
    router.visit('/')
  }

  return (
    <Sidebar collapsible="offcanvas" className="md:flex" {...props}>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Details</div>
          <SidebarTrigger onClick={handleCloseSidebarClick}>
            <X />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {page.props.selectedMedia ? (
              <MediaDetails
                media={page.props.selectedMedia}
                watchStatuses={page.props.watchStatuses}
              />
            ) : (
              <MediaDetailsSkeleton />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
