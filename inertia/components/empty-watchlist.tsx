import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Clapperboard } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface EmptyWatchlistProps {
  children?: React.ReactNode
}

export function EmptyWatchlist({ children }: EmptyWatchlistProps) {
  const { t } = useTranslation()
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Clapperboard />
        </EmptyMedia>
        <EmptyTitle>{t('empty_watchlist.title')}</EmptyTitle>
        <EmptyDescription>{t('empty_watchlist.description')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
