import { ImportMyAnimeListDialog } from '@/components/import-my-anime-list-dialog'
import { SearchMediaInput } from '@/components/search-media-input'
import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InertiaProps } from '@/types'
import { Form, Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { props } = usePage<InertiaProps>()

  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6">
        <div className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
          <Link route="home">Self Watchlist</Link>
          <SearchMediaInput />
          {/* className="pl-8 bg-secondary border-border text-foreground placeholder:text-muted-foreground" */}
          <nav className="flex gap-2">
            <ImportMyAnimeListDialog />
            <ThemeModeToggle />
            {props.user ? (
              <>
                <span>{props.user.initials}</span>
                <Form route="session.destroy">
                  <Button type="submit">Logout</Button>
                </Form>
              </>
            ) : (
              <>
                <Link
                  route="new_account.create"
                  className={cn(buttonVariants({ variant: 'default', size: 'default' }))}
                >
                  Signup
                </Link>
                <Link
                  route="session.create"
                  className={cn(buttonVariants({ variant: 'outline', size: 'default' }))}
                >
                  Login
                </Link>
              </>
            )}
          </nav>
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
      </div>
    </header>
  )
}

export default Navbar
