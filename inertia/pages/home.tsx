import { MediaCard } from '@/components/media-card'
import { InertiaProps } from '@/types'
// import { Link } from "@adonisjs/inertia/react";
import { Data } from '@generated/data'

type PageProps = InertiaProps<{ medias: Data.Media[] }>

export default function Home({ medias }: PageProps) {
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
            // <Link href={`/animes/${media.id}`} key={media.id}>
            // </Link>
          ))}
        </div>

        {/* <Paginator meta={data.animes.meta} /> */}
      </div>
    </div>
  )
}
