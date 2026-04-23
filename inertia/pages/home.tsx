import type { WatchStatus } from '#types/types'
import { MediaCard } from '@/components/media-card'
import { useSidebar } from '@/components/ui/sidebar'
import { InertiaProps } from '@/types'
import { Data } from '@generated/data'
import { useEffect } from 'react'

type PageProps = InertiaProps<{
  medias: Data.MediaCard[]
  selectedMedia?: Data.AnimeDetails
  watchStatuses?: Array<WatchStatus>
}>

export default function Home({ medias, selectedMedia }: PageProps) {
  const { setOpen } = useSidebar()

  useEffect(() => {
    // Assuming we opened the page with a "mediaId" query parameter in the url,
    // we need to open the sidebar.
    if (selectedMedia) {
      setOpen(true)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <AnimeFilters {...data.filters} /> */}

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">À voir</h1>
          <div className="text-sm text-muted-foreground">{medias.length} résultats trouvés</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {medias.map((media) => (
            <MediaCard media={media} key={media.id} />
          ))}
        </div>

        {/* <Paginator meta={data.animes.meta} /> */}
      </div>
    </div>
  )
}
