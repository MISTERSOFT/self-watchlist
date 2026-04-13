import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Form, Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }
  if (children.props.flash.success) {
    toast.success(children.props.flash.success)
  }

  return (
    <>
      <header>
        <div>
          <div>
            <Link route="home">Self Watchlist</Link>
          </div>
          <div>
            <nav>
              {children.props.user ? (
                <>
                  <span>{children.props.user.initials}</span>
                  <Form route="session.destroy">
                    <button type="submit"> Logout </button>
                  </Form>
                </>
              ) : (
                <>
                  <Link route="new_account.create">Signup</Link>
                  <Link route="session.create">Login</Link>
                </>
              )}
            </nav>
          </div>
          <div>
            <ThemeModeToggle />
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-background">{children}</main>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
