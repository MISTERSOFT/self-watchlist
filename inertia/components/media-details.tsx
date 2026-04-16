import type { WatchStatus } from '#types/types'
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
import { cn } from '@/lib/utils'
import { Data } from '@generated/data'
import { ExternalLink, Play, Trash } from 'lucide-react'

interface MediaDetailsProps {
  media: Data.AnimeDetail
  watchStatuses: WatchStatus[]
}

export function MediaDetails({ media, watchStatuses }: MediaDetailsProps) {
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
      <Button variant="destructive" size="lg" className="w-full">
        Remove from watchlist
        <Trash />
      </Button>
    </div>
  )
}
