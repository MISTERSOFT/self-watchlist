import { getSdk, type Requester } from '#graphql/generated/anilist/types'
import { print, type DocumentNode } from 'graphql'

const requester: Requester = async (
  document: DocumentNode,
  variables?: unknown,
  options?: unknown
) => {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: print(document), variables }),
  })

  const json = await response.json()

  // @ts-ignore
  if (json.errors?.length) {
    // @ts-ignore
    throw new Error(json.errors.map((e: { message: string }) => e.message).join('\n'))
  }

  // @ts-ignore
  return json.data
}

export const anilist = getSdk(requester)
