import { urlFor } from '@/client'
import { useImportMyAnimeListDialog } from '@/components/import-my-anime-list-dialog-provider'
import { Theme, themes, useTheme } from '@/components/theme-provider'
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
import { useTranslation } from 'react-i18next'

const ThemeSelector = () => {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const isSelected = (themeValue: Theme) => themeValue === theme

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>{t('menu.theme.title')}</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuGroup>
              {themes.map((themeValue, k) => (
                <DropdownMenuCheckboxItem
                  key={k}
                  checked={isSelected(themeValue)}
                  onCheckedChange={() => setTheme(themeValue)}
                >
                  {t(`menu.theme.colors.${themeValue}`)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}

interface LoggedUserDropdownMenuProps {
  user: NonNullable<InertiaProps['user']>
}

export const LoggedUserDropdownMenu = ({ user }: LoggedUserDropdownMenuProps) => {
  const { setOpen } = useImportMyAnimeListDialog()
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
        </DropdownMenuGroup>
        <ThemeSelector />
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
