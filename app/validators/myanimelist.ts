import vine from '@vinejs/vine'

// https://myanimelist.net/animelist/<USERNAME>/load.json
export const malUserAnimeListUrlSchema = vine
  .string()
  .url({
    protocols: ['https'],
    require_protocol: true,
  })
  .regex(/^https:\/\/myanimelist\.net\/animelist\/[a-zA-Z0-9_-]+\/load\.json$/)
