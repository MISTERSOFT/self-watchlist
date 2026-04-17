import { ImportMyAnimeListDialog } from '@/components/import-my-anime-list-dialog'
import { LoggedUserDropdownMenu } from '@/components/logged-user-dropdown-menu'
import { SearchMediaInput } from '@/components/search-media-input'
import { InertiaProps } from '@/types'
import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { props } = usePage<InertiaProps>()

  return (
    <header className="bg-background/90 backdrop-blur-lg sticky top-0 z-50">
      <ImportMyAnimeListDialog />

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6">
        <div className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
          <Link route="home">Self Watchlist</Link>
          <SearchMediaInput />
          <LoggedUserDropdownMenu user={props.user!} />
        </div>

        <div className="flex items-center gap-6 md:hidden">
          {/* <Button variant="ghost" size="icon">
            <SearchIcon />
            <span className="sr-only">Search</span>
          </Button> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger className='md:hidden' asChild>
              <Button variant='outline' size='icon'>
                <MenuIcon />
                <span className='sr-only'>Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuGroup>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <a href={item.href}>{item.title}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
