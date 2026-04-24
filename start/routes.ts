/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/', [controllers.Home, 'index']).as('home')
    router.post('logout', [controllers.Session, 'destroy'])

    router
      .group(() => {
        router.post('import/mal', [controllers.ImportMyanimelist, 'store'])

        router
          .group(() => {
            router.get('search', [controllers.Watchlist, 'search'])
            router.post('add', [controllers.Watchlist, 'add'])
            router.post('update', [controllers.Watchlist, 'update'])
            router.delete('remove', [controllers.Watchlist, 'remove'])
          })
          .prefix('/watchlist')
      })
      .prefix('/api')
  })
  .use(middleware.auth())
