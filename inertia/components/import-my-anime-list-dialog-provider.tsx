import { createContext, useContext, useState } from 'react'

type ImportMyAnimeListDialogProviderProps = {
  children: React.ReactNode
  // open: boolean
}

type ImportMyAnimeListDialogProviderState = {
  open: boolean
  setOpen: (state: boolean) => void
}

const initialState: ImportMyAnimeListDialogProviderState = {
  open: false,
  setOpen: () => {},
}

const ImportMyAnimeListDialogProviderContext =
  createContext<ImportMyAnimeListDialogProviderState>(initialState)

export function ImportMyAnimeListDialogProvider({
  children,
  ...props
}: ImportMyAnimeListDialogProviderProps) {
  const [open, setOpen] = useState<boolean>(false)

  const value = {
    open,
    setOpen,
  }

  return (
    <ImportMyAnimeListDialogProviderContext.Provider {...props} value={value}>
      {children}
    </ImportMyAnimeListDialogProviderContext.Provider>
  )
}

export const useImportMyAnimeListDialog = () => {
  const context = useContext(ImportMyAnimeListDialogProviderContext)

  if (context === undefined)
    throw new Error(
      `${useImportMyAnimeListDialog.name} must be used within a ImportMyAnimeListDialogProvider`
    )

  return context
}
