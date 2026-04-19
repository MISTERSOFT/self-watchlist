import { urlFor } from '@/client'
import { useImportMyAnimeListDialog } from '@/components/import-my-anime-list-dialog-provider'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useURLParams } from '@/hooks/use-url-params'
import { InertiaProps } from '@/types'
// eslint-disable-next-line @adonisjs/prefer-adonisjs-inertia-link
import { Link } from '@inertiajs/react'
import { ChevronDown, LogOut } from 'lucide-react'
import { useCallback } from 'react'

interface LoggedUserDropdownMenuProps {
  user: NonNullable<InertiaProps['user']>
}

export const LoggedUserDropdownMenu = ({ user }: LoggedUserDropdownMenuProps) => {
  const { setOpen } = useImportMyAnimeListDialog()
  const { theme, setTheme } = useTheme()
  const { urlParams } = useURLParams()

  const openImportDialog = useCallback(() => setOpen(true), [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="lg">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.initials}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.initials}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={openImportDialog}>Import from MyAnimeList</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'light'}
                    onCheckedChange={() => setTheme('light')}
                  >
                    Light
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme('dark')}
                  >
                    Dark
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'system'}
                    onCheckedChange={() => setTheme('system')}
                  >
                    System
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={urlFor('session.destroy', undefined, { qs: urlParams })}
            method="post"
            className="flex flex-1"
          >
            <LogOut className="mr-2" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
