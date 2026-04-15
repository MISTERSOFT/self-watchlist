import Navbar from '@/components/navbar'
import { InertiaProps } from '@/types'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const page = usePage<InertiaProps>()

  useEffect(() => {
    toast.dismiss()
  }, [page.url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }
  if (children.props.flash.success) {
    toast.success(children.props.flash.success)
  }

  return (
    <>
      {page.props.user && <Navbar />}
      <main className="min-h-screen bg-background">{children}</main>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
