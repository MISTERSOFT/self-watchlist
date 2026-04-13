import { Loader } from '@/components/loader'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { InertiaProps } from '@/types'
import { Form } from '@adonisjs/inertia/react'
import { router, usePage } from '@inertiajs/react'
import { CloudDownload } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ImportMyAnimeListDialogProps {
  // children?: React.ReactNode,
}

export function ImportMyAnimeListDialog({}: ImportMyAnimeListDialogProps) {
  const page = usePage<InertiaProps>()

  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Close dialog when import finished successfully
    router.on('finish', () => {
      if (page.props.flash.success) {
        close()
      }
    })
  }, [page.props.flash])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handleOnCancel = () => close()

  const close = () => {
    setUsername('')
    setOpen(false)
  }

  const handleOnOpenChange = (open: boolean) => setOpen(open)

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
        <CloudDownload />
        <span className="sr-only">Import from MyAnimeList user profile</span>
      </DialogTrigger>
      <DialogContent showCloseButton={false} onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Import from MyAnimeList</DialogTitle>
          <DialogDescription>
            Import your anime watchlist (Plan to watch, Watching, Completed, etc...) from your
            MyAnimeList profile.
          </DialogDescription>
        </DialogHeader>
        <Form route="import_myanimelist.store">
          {({ processing }) => (
            <>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="mal-username" className="sr-only">
                    MAL Username
                  </Label>
                  <Input
                    id="mal-username"
                    name="username"
                    autoComplete="off"
                    placeholder="Your MyAnimeList username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-end mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleOnCancel}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processing || !username}>
                  {!processing && <>Import</>}
                  {processing && (
                    <>
                      Importing...
                      <Loader />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
