import type { Maybe, Media, MediaSeason, MediaStatus } from '#graphql/generated/anilist/types'
import type { SearchQueryMediaItem } from '#types/types'
import { flow, uniq } from 'es-toolkit'

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

  normalizeTitles(data: Media | SearchQueryMediaItem): string {
    return this._normalizeTitlesFn([data!.title?.english, data!.title?.native], data!.title?.romaji)
  }

  normalizeStatus(status: MediaStatus): 'finished' | 'airing' | 'cancelled' | null {
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

  normalizeScore(score: number): number | null {
    if (score === undefined) {
      return null
    }
    return score / 10
  }

  normalizeSeason(season: MediaSeason): string | null {
    if (!season) {
      return null
    }
    return season.toLowerCase()
  }
}
