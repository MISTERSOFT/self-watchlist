import { Card, CardContent } from '@/components/ui/card'
import { useSidebar } from '@/components/ui/sidebar'
import { useTranslations } from '@/hooks/use-translations'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useCallback } from 'react'

interface MediaCardProps {
  media: Data.Media
}

export function MediaCard({ media }: MediaCardProps) {
  const { t } = useTranslations()
  const { setOpen } = useSidebar()

  const openSidebar = useCallback(() => {
    setOpen(true)
    router.reload({ data: { mediaId: media.id }, only: ['selectedMedia', 'watchStatuses'] })
  }, [])

  return (
    <Card
      className="py-0 group cursor-pointer transition-all duration-300 hover:shadow-lg bg-card border-border overflow-hidden gap-0 select-none"
      onClick={openSidebar}
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={media.thumbnailUrl || '/public/logo_bg_white.png'}
          alt={media.title}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {/* <Play className="h-12 w-12 text-white" /> */}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 truncate" title={media.title}>
            {media.title}
          </h3>
          {/* <p className="text-sm text-muted-foreground line-clamp-1">{anime.genres}</p> */}
        </div>

        {/* <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {media.seasonYear}
          </div>
          <div className="flex items-center gap-1">
            <Play className="h-3 w-3" />
            {media.episodesCount} épisodes
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">
              {media.score || '-'}
            </span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}
