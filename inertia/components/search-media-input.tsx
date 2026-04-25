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
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { FilmIcon, LoaderCircle, SearchIcon } from 'lucide-react'
import { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const MIN_SEARCH_QUERY_LENGTH = 3

type SearchMedia = Data.AnimeSearch | Data.MovieSearch | Data.TvshowSearch
type SearchMediaQueryData =
  ReturnType<typeof api.watchlist.search.queryOptions> extends UseQueryOptions<
    infer TData,
    any,
    any,
    any
  >
    ? TData
    : never

function useSearchMediaQuery<TSelected = SearchMediaQueryData>(
  search: string,
  type: 'anime' | 'movie' | 'tvshow',
  select: (data: NoInfer<SearchMediaQueryData>) => TSelected
) {
  return useQuery(
    api.watchlist.search.queryOptions(
      {
        query: { search, type },
      },
      {
        enabled: search.length >= MIN_SEARCH_QUERY_LENGTH,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        select,
        initialData: {
          data: [],
        },
      }
    )
  )
}

interface SearchMediaInputProps {}

export function SearchMediaInput({}: SearchMediaInputProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [mediaType, setMediaType] = useState<'anime' | 'movie' | 'tvshow'>('anime')
  const [debouncedSearch] = useDebounce(searchValue, 300)
  const searchQuery = useSearchMediaQuery(debouncedSearch, mediaType, (data) => data.data)
  const addMediaToWatchlist = useMutation(
    api.watchlist.add.mutationOptions({
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
      loading: t('search_media.add.pending', { name: media.title }),
      success: (_) => {
        return t('search_media.add.success', { name: media.title })
      },
      error: t('search_media.add.failed', { name: media.title }),
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

  const handleMediaTypeChange = useCallback((value: string) => {
    // @ts-ignore
    setMediaType(value)
  }, [])

  return (
    <Popover open={open} modal={false}>
      <PopoverAnchor asChild>
        <InputGroup>
          <InputGroupInput
            placeholder={t('search_media.placeholder')}
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <Select defaultValue="anime" value={mediaType} onValueChange={handleMediaTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="anime">{t('media_type.anime')}</SelectItem>
                <SelectItem value="movie">{t('media_type.movie')}</SelectItem>
                <SelectItem value="tvshow">{t('media_type.tvshow')}</SelectItem>
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
              <LoaderCircle className="animate-spin mr-1" size={18} />
              {t('search_media.searching')}
            </div>
          )}

          {!searchQuery.isEnabled && (
            <div className="flex items-center justify-center h-10">
              {t('search_media.minimum_search_characters', { min: MIN_SEARCH_QUERY_LENGTH })}
            </div>
          )}

          {searchQuery.isFetched && searchQuery.data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <FilmIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('search_media.no_results')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('search_media.try_another_search')}
              </p>
            </div>
          )}

          {searchQuery.isFetched && searchQuery.data.length > 0 && (
            <div className="h-72 space-y-2">
              <div className="font-bold">
                {t('search_media.results_count', { count: searchQuery.data.length })}
              </div>
              {searchQuery.data.map((media) => (
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
