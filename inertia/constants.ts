import string from '@adonisjs/core/helpers/string'

export const appName = import.meta.env.VITE_APP_NAME || 'Self Watchlist'
export const themeStorageKey = `${string.snakeCase(appName)}-ui-theme`
