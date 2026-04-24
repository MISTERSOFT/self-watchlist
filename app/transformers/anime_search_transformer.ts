import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import type { SearchQueryMediaItem } from '#types/types'
import { inject } from '@adonisjs/core'
import { BaseTransformer } from '@adonisjs/core/transformers'
import { DateTime } from 'luxon'

export default class AnimeSearchTransformer extends BaseTransformer<SearchQueryMediaItem> {
  @inject()
  toObject(normalizer: AnilistNormalizerService) {
    return {
      type: 'anime' as const,
      externalSource: 'anilist',
      externalSourceId: this.resource!.id.toString(),
      title: this.resource!.title?.romaji as string,
      alternativeTitles: normalizer.normalizeTitles(this.resource),
      thumbnailUrl: this.resource!.coverImage?.extraLarge || null,
      nsfw: this.resource!.isAdult || false,
      score: normalizer.normalizeScore(this.resource!.meanScore!),
      releasedAt: DateTime.fromObject(
        {
          year: this.resource!.startDate?.year!,
          month: this.resource!.startDate?.month!,
          day: this.resource!.startDate?.day!,
        },
        { zone: 'Europe/Paris' }
      ),
    }
  }
}
