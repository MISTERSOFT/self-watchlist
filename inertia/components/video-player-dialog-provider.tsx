import { createContext, useContext, useState } from 'react'

type VideoPlayerDialogProviderProps = {
  children: React.ReactNode
}

type VideoPlayerDialogProviderState = {
  open: boolean
  title: string
  url: string
  openDialog: (title: string, url: string) => void
  closeDialog: () => void
}

const initialState: VideoPlayerDialogProviderState = {
  open: false,
  title: '',
  url: '',
  openDialog: () => {},
  closeDialog: () => {},
}

const VideoPlayerDialogProviderContext = createContext<VideoPlayerDialogProviderState>(initialState)

export function VideoPlayerDialogProvider({ children, ...props }: VideoPlayerDialogProviderProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const value: VideoPlayerDialogProviderState = {
    open,
    title,
    url,
    openDialog: (title, url) => {
      setTitle(title)
      setUrl(url)
      setOpen(true)
    },
    closeDialog: () => {
      setOpen(false)
    },
  }

  return (
    <VideoPlayerDialogProviderContext.Provider {...props} value={value}>
      {children}
    </VideoPlayerDialogProviderContext.Provider>
  )
}

export const useVideoPlayerDialog = () => {
  const context = useContext(VideoPlayerDialogProviderContext)

  if (context === undefined)
    throw new Error(`${useVideoPlayerDialog.name} must be used within a VideoPlayerDialogProvider`)

  return context
}
