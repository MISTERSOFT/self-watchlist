import type { WatchStatus } from '#types/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useURLParams } from '@/hooks/use-url-params'
import { InertiaProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface MediaFiltersProps {}

export function MediaFilters({}: MediaFiltersProps) {
  const { props } = usePage<InertiaProps<{ watchStatuses: WatchStatus[] }>>()
  const { t } = useTranslation()
  const { urlParams } = useURLParams()
  const [selectedValue, setSelectedValue] = useState<WatchStatus>('plan_to_watch')

  useEffect(() => {
    const value: WatchStatus = (urlParams?.watchStatus as WatchStatus) || 'plan_to_watch'
    setSelectedValue(value)
  }, [urlParams])

  const handleValueChange = (value: WatchStatus) => {
    router.visit('/', { data: { ...urlParams, watchStatus: value } })
  }

  if (!selectedValue) {
    return <></>
  }

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-fit max-48 border-0 text-2xl dark:bg-transparent dark:text-white font-semibold pl-0 cursor-pointer">
        <SelectValue placeholder="Select watch status" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {props.watchStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {t(`watch_status.${status}`, { ns: 'common' })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
