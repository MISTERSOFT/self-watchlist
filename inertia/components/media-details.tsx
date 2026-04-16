import type { WatchStatus } from '#types/types'
import { api } from '@/client'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useRouter } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { useMutation } from '@tanstack/react-query'
import { ExternalLink, Play, Trash } from 'lucide-react'
import { toast } from 'sonner'

interface MediaDetailsProps {
  media: Data.AnimeDetail
  watchStatuses: WatchStatus[]
}

export function MediaDetails({ media, watchStatuses }: MediaDetailsProps) {
  const router = useRouter()
  const { setOpen } = useSidebar()
  const removeMediaFromWatchlist = useMutation(
    api.medias.removeFromWatchlist.mutationOptions({
      onSuccess: () => {
        router.visit<'home'>({ route: 'home' }, { preserveScroll: false, only: ['medias'] })
      },
      onSettled: () => {
        setOpen(false)
      },
    })
  )

  const handleRemoveConfirm = () => {
    const mutatePromise = removeMediaFromWatchlist.mutateAsync({
      body: {
        mediaId: media.id,
        type: 'anime',
      },
    })
    toast.promise(mutatePromise, {
      loading: 'Removing media...',
      success: () => {
        return `"${media.title}" has been removed from your watchlist`
      },
      error: 'An error occured. Unable to remove the media from your watchlist.',
    })
  }

  return (
    <div className="flex flex-col items-start gap-4 p-2 text-sm whitespace-break-spaces leading-tight">
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium">Watch status</span>
        <Select defaultValue="plan_to_watch" value={media.watch_status}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {watchStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={media.thumbnailUrl || '/public/logo_bg_white.png'}
          alt={media.title}
          className="object-cover"
        />
      </div>
      <div className="text-lg font-medium">{media.title}</div>
      <div className="text-xs font-medium">{media.alternativeTitles}</div>
      <div className="space-x-2">
        <Button>
          Trailer <Play />
        </Button>
        <a
          className={cn(buttonVariants({ variant: 'link', className: '' }))}
          href={`https://myanimelist.net/anime/${media.myanimelistId}`}
          target="_blank"
        >
          MAL page <ExternalLink size={12} />
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Synopsis</span>
        <p className="font-light text-justify ">{media.synopsis}</p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Genres</span>
        <div className="space-x-2 space-y-2">
          {media.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="flex flex-col gap-2">
          <span className="font-medium">Type</span>
          <Badge>{media.type}</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">Episodes</span>
          {media.episodesCount}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">NSFW</span>
          {media.nsfw ? '✅' : '❌'}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">Score</span>
          {media.score}/10
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">Status</span>
          {media.status}
        </div>
      </div>

      <ConfirmDialog
        title="Confirm deletion"
        text="Are you sure you want to remove this content from your favorites list?"
        onConfirm={handleRemoveConfirm}
      >
        <Button variant="destructive" size="lg" className="w-full">
          Remove from watchlist
          <Trash />
        </Button>
      </ConfirmDialog>
    </div>
  )
}
