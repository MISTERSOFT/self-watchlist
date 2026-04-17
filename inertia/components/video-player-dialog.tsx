import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useVideoPlayerDialog } from '@/components/video-player-dialog-provider'

interface VideoPlayerDialogProps {
  // children?: React.ReactNode
}

export function VideoPlayerDialog({}: VideoPlayerDialogProps) {
  const { open, title, url, closeDialog } = useVideoPlayerDialog()

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      closeDialog()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:min-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <iframe className="aspect-video" src={url}></iframe>
      </DialogContent>
    </Dialog>
  )
}
