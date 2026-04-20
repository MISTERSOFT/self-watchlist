import stringHelpers from '#extensions/core/helpers/string_extension'
import type {
  Maybe,
  Media,
  MediaFormat,
  MediaSeason,
  MediaStatus,
} from '#graphql/generated/anilist/types'
import type Anime from '#models/anime'
import Genre from '#models/genre'
import { flow, uniq } from 'es-toolkit'
import Fuse from 'fuse.js'
import { DateTime } from 'luxon'

type NormalizedData = {
  anime: Partial<Anime>
  genres: Array<Genre>
}

export class AnilistNormalizerService {
  /**
   * Use ES Toolkit flow to normalize titles
   */
  private _normalizeTitlesFn = flow(
    (titles: Maybe<string>[], romajiTitle: Maybe<string>) =>
      titles.filter((title) => Boolean(title) && title !== romajiTitle),
    uniq,
    (titles: string[]) => titles.join(',')
  )

  async normalizeData(data: Media[]): Promise<NormalizedData[]> {
    const genresFromDb = await Genre.all()
    const medias = data.filter((media) => media?.idMal !== null)!

    return Promise.all(
      medias.map((media) => ({
        anime: this.normalize(media),
        genres: this._normalizeGenres(media!.genres!, genresFromDb),
      }))
    )
  }

  normalize(media: Media): Partial<Anime> {
    return {
      externalSourceId: media!.id.toString(),
      externalSource: 'anilist',
      myanimelistId: media!.idMal!.toString(),
      // slug: stringHelpers.slug(media!.title?.romaji!, {
      //   lower: true,
      //   strict: true,
      //   locale: 'en',
      // }),
      title: media!.title?.romaji as string,
      alternativeTitles: this.normalizeTitles(media!),
      type: media!.format!.toLowerCase(),
      synopsis: stringHelpers.stripHtmlTags(media?.description!),
      // synopsis: await TranslatorService.translate(stringHelpers.stripHtmlTags(media?.description!)),
      score: this._normalizeScore(media!.meanScore!),
      status: this._normalizeStatus(media!.status!),
      season: this._normalizeSeason(media!.season!),
      seasonYear: media!.seasonYear!,
      thumbnailUrl: media!.coverImage?.extraLarge || null,
      backgroundUrl: media!.bannerImage || null,
      trailerSource: media!.trailer?.site || null,
      trailerId: media!.trailer?.id || null,
      episodesCount: media!.episodes || null,
      nsfw: media!.isAdult || false,
      releasedAt: DateTime.fromObject(
        {
          year: media!.startDate?.year!,
          month: media!.startDate?.month!,
          day: media!.startDate?.day!,
        },
        { zone: 'Europe/Paris' }
      ),
      // genres: this.normalizeGenres(media!.genres!, genresFromDb),
    }
  }

  normalizeTitles(data: Media): string {
    // const normalize = flow(
    //   (titles: string[]) => titles.filter((title: string) => Boolean(title) && title !== data.title?.romaji),
    //   uniq,
    //   Array.prototype.join
    // )

    // return _([data.title?.english, data.title?.native])
    //   .filter((title) => Boolean(title) && title !== data.title?.romaji)
    //   .uniq()
    //   .join(',')
    return this._normalizeTitlesFn([data.title?.english, data.title?.native], data.title?.romaji)
  }

  private _normalizeStatus(status: MediaStatus): 'finished' | 'airing' | 'cancelled' | null {
    switch (status) {
      case 'CANCELLED':
        return 'cancelled'
      case 'FINISHED':
        return 'finished'
      case 'RELEASING':
        return 'airing'
      default:
        return null
    }
  }
  private _normalizeType(type: MediaFormat): string | null {
    switch (type) {
      case 'TV_SHORT':
        return 'tv'
      case 'MOVIE':
      case 'ONA':
      case 'OVA':
      case 'SPECIAL':
      case 'TV':
        return type.toLowerCase()

      default:
        return null
    }
  }
  private _normalizeScore(score: number): number | null {
    if (score === undefined) {
      return null
    }
    return score / 10
  }

  private _normalizeGenres(mediaGenres: Maybe<string>[], dbGenres: Genre[]): Genre[] {
    if (!mediaGenres || mediaGenres.length === 0) {
      return []
    }
    const lowered = mediaGenres.map((x) => x!?.toLowerCase())
    const fuse = new Fuse(dbGenres, {
      includeScore: true,
      keys: ['slug'],
    })
    let matchedGenres: Genre[] = []
    lowered.forEach((q) => {
      const result = fuse.search(q).filter((r) => {
        return r.score! < 0.1
      })
      matchedGenres = matchedGenres.concat(result.map((x) => x.item))
    })
    return matchedGenres
  }

  private _normalizeSeason(season: MediaSeason): string | null {
    if (!season) {
      return null
    }
    return season.toLowerCase()
  }
}
