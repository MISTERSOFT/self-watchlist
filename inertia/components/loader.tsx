import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return <LoaderCircle className={cn('animate-spin ml-2', className)} />
}
