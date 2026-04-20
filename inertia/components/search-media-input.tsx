import { api } from '@/client'
import { Badge } from '@/components/ui/badge'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useDebounce from '@/hooks/use-debounce'
import { router } from '@inertiajs/react'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Route } from '@tuyau/core/types'
import { FilmIcon, LoaderCircle, SearchIcon } from 'lucide-react'
import { ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'sonner'

const MIN_SEARCH_QUERY_LENGTH = 3

type SearchMedia = Route.Response<'medias.search'>['data']['medias'][number]
type SearchMediaQueryData =
  ReturnType<typeof api.medias.search.queryOptions> extends UseQueryOptions<
    infer TData,
    any,
    any,
    any
  >
    ? TData
    : never

function useSearchMediaQuery<TSelected = SearchMediaQueryData>(
  search: string,
  select: (data: NoInfer<SearchMediaQueryData>) => TSelected
) {
  return useQuery(
    api.medias.search.queryOptions(
      {
        query: { search, type: 'anime' },
      },
      {
        enabled: search.length >= MIN_SEARCH_QUERY_LENGTH,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        select,
        initialData: {
          data: {
            type: 'anime',
            success: true,
            medias: [],
          },
        },
      }
    )
  )
}

interface SearchMediaInputProps {}

export function SearchMediaInput({}: SearchMediaInputProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch] = useDebounce(searchValue, 300)
  const searchQuery = useSearchMediaQuery(debouncedSearch, (data) => data.data)
  const addMediaToWatchlist = useMutation(
    api.medias.addToWatchlist.mutationOptions({
      onSuccess: () => {
        router.reload()
      },
    })
  )

  const handleSelectMedia = (media: SearchMedia) => {
    setOpen(false)
    setSearchValue('')
    const mutatePromise = addMediaToWatchlist.mutateAsync({
      body: {
        externalSourceId: media.externalSourceId,
        type: media.type,
      },
    })
    toast.promise(mutatePromise, {
      loading: 'Adding anime...',
      success: (data) => {
        return `"${data.data.name}" has been added`
      },
      error: 'An error occured. Unable to add the media.',
    })
  }

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchValue(value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setOpen(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Popover open={open} modal={false}>
      <PopoverAnchor asChild>
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <Select defaultValue="anime">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="movie">Movie/TV Show</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </InputGroup>
      </PopoverAnchor>
      <PopoverContent
        className="w-(--radix-popover-trigger-width)"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <ScrollArea onClick={(e) => e.preventDefault()}>
          {searchQuery.isFetching && (
            <div className="flex items-center justify-center min-h-10 py-6 text-sm">
              <LoaderCircle className="animate-spin mr-1" size={18} /> Recherche en cours...
            </div>
          )}

          {!searchQuery.isEnabled && (
            <div className="flex items-center justify-center h-10">
              {MIN_SEARCH_QUERY_LENGTH} caractères minimum requis pour lancer la recherche.
            </div>
          )}

          {searchQuery.isFetched && searchQuery.data.medias.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <FilmIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun anime trouvé.</h3>
              <p className="text-sm text-muted-foreground">
                Essaie une autre recherche, peut-être qu'elle sera plus efficace.
              </p>
            </div>
          )}

          {searchQuery.isFetched && searchQuery.data?.medias.length > 0 && (
            <div className="h-72 space-y-2">
              <div className="font-bold">
                Résultats ({searchQuery.data.medias.length} médias trouvés)
              </div>
              {searchQuery.data?.medias.map((media) => (
                <div
                  key={media.externalSourceId}
                  onClick={() => handleSelectMedia(media)}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-primary/80"
                >
                  <img
                    src={media.thumbnailUrl || 'resources/images/no-image-154x190.png'}
                    alt={media.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium">{media.title}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" size="xs">
                        {media.type}
                      </Badge>
                      {media.nsfw && (
                        <Badge variant="destructive" size="xs">
                          +18
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
