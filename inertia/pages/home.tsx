import { InertiaProps } from '@/types';
// import { Link } from "@adonisjs/inertia/react";
import { Data } from "@generated/data";

type PageProps = InertiaProps<{ medias: Data.Media[] }>

export default function Home({}: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <DynamicBreadcrumb /> */}

      {/* <AnimeFilters {...data.filters} /> */}

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Liste des Animes</h1>
          <div className="text-sm text-muted-foreground">
            {/* {data.animes.meta.total} */}0 résultats trouvés
          </div>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.animes.data.map((anime) => (
            <Link href={`/animes/${anime.slug}`} key={anime.id}>
              <AnimeCard anime={anime} />
            </Link>
          ))}
        </div> */}

        {/* <Paginator meta={data.animes.meta} /> */}
      </div>
    </div>
  )
}
