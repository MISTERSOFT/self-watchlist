import { registry } from '@generated/registry'
import { QueryClient } from '@tanstack/react-query'
import { createTuyau } from '@tuyau/core/client'
import { createTuyauReactQueryClient } from '@tuyau/react-query'

export const queryClient = new QueryClient()
export const client = createTuyau({
  baseUrl: '/',
  registry,
})
export const api = createTuyauReactQueryClient({ client })

export const urlFor = client.urlFor
