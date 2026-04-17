import { Skeleton } from '@/components/ui/skeleton'

interface MediaDetailsSkeletonProps {
  // children?: React.ReactNode,
}

export function MediaDetailsSkeleton({}: MediaDetailsSkeletonProps) {
  return (
    <div className="flex flex-col items-start gap-4 p-2">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-4 w-20"></Skeleton>
        <Skeleton className="h-8 w-full"></Skeleton>
      </div>
      <Skeleton className="aspect-3/4 w-full"></Skeleton>
      <Skeleton className="h-8 w-64"></Skeleton>
      <Skeleton className="h-4 w-48"></Skeleton>
      <Skeleton className="h-64 w-full"></Skeleton>
    </div>
  )
}
