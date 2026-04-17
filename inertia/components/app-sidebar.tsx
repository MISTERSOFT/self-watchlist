import { X } from 'lucide-react'

import type { WatchStatus } from '#types/types'
import { MediaDetails } from '@/components/media-details'
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
import { usePage } from '@inertiajs/react'
import type { ComponentProps } from 'react'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const page =
    usePage<InertiaProps<{ selectedMedia: Data.AnimeDetail; watchStatuses: WatchStatus[] }>>()

  return (
    <Sidebar collapsible="offcanvas" className="md:flex" {...props}>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Details</div>
          <SidebarTrigger>
            <X />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <MediaDetails
              media={page.props.selectedMedia}
              watchStatuses={page.props.watchStatuses}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
