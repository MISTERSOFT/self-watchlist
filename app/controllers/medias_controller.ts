import { Media } from '#graphql/generated/anilist/types'
import type Anime from '#models/anime'
import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import { AnilistService } from '#services/anilist_service'
import { AnimesService } from '#services/animes_service'
import {
  addNewMediaValidator,
  deleteUserMediaValidator,
  searchNewMediaValidator,
} from '#validators/media'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

type SafeProperty<T> = { [P in keyof T]: NonNullable<T[P]> }
type SearchMedia = Pick<
  SafeProperty<Anime>,
  'externalSource' | 'externalSourceId' | 'title' | 'alternativeTitles' | 'thumbnailUrl' | 'nsfw'
> & {
  type: 'anime' | 'movie' | 'tvshow'
}

@inject()
export default class MediasController {
  constructor(
    protected readonly _anilistService: AnilistService,
    protected readonly _anilistNormalizerService: AnilistNormalizerService,
    protected readonly _animesService: AnimesService
  ) {}

  async search({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { search, type } = await request.validateUsing(searchNewMediaValidator)

    if (type === 'anime') {
      const userAnilistAnimeIds = await this._animesService.getAnimeAnilistIdsByUser(user.id)
      const result = await this._anilistService.search({
        search,
        // Remove from the search query animes that are already associated to the user in database
        idNotIn: userAnilistAnimeIds,
      })

      const data = result.Page?.media?.map((media) => {
        const { externalSource, externalSourceId, title, alternativeTitles, thumbnailUrl, nsfw } =
          this._anilistNormalizerService.normalizeAnime(media as Media)
        return {
          externalSource,
          externalSourceId,
          title,
          alternativeTitles,
          thumbnailUrl,
          nsfw,
          type: 'anime',
        } as SearchMedia
      })

      return serialize({
        success: true,
        type,
        medias: data || [],
      })
    } else {
      // TODO: Film, tvshow
      return serialize({
        success: true,
        type,
        medias: new Array<SearchMedia>(),
      })
    }
  }

  async addToWatchlist({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { externalSourceId, type } = await request.validateUsing(addNewMediaValidator)

    let name = ''

    if (type === 'anime') {
      const queryResult = await this._anilistService.getByMediaId({ mediaId: externalSourceId })
      await this._animesService.saveAnilistGqlMedia(
        queryResult.Page?.media,
        user.id,
        () => 'plan_to_watch'
      )

      const media = queryResult.Page?.media![0]!
      name = media.title?.romaji! || media.title?.english! || media.title?.native!
    }

    return serialize({
      success: true,
      name,
    })
  }

  async removeFromWatchlist({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { mediaId, type } = await request.validateUsing(deleteUserMediaValidator)

    switch (type) {
      case 'anime':
        await this._animesService.removeFromWatchlist(mediaId, user.id)
        break

      case 'movie':
        break

      case 'tvshow':
        break

      default:
        break
    }

    return serialize({ success: true })
  }
}
