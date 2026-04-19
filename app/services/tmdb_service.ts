import logger from '@adonisjs/core/services/logger'

const TMDB_BASE_URL = 'https://api.themoviedb.org'
const TMDB_API_VERSION = '3'
const TMDB_API_URL = `${TMDB_BASE_URL}/${TMDB_API_VERSION}/`

//#region Common types
type TMDBPagination<T> = {
  page: number
  results: Array<T>
  total_pages: number
  total_results: number
}
//#endregion

//#region Search movie types
type TMDBSearchMovieQueryParams = {
  query: string
  include_adult?: boolean
  language?: string
  primary_release_year?: string
  page?: number
  region?: string
  year?: string
}
const DEFAULT_TMDB_SEARCH_MOVIE_QUERY_PARAMS: TMDBSearchMovieQueryParams = {
  query: '',
  include_adult: true,
  language: 'en-US',
  page: 1,
}
type TMDBSearchMovieResponse = TMDBPagination<{
  adult: number
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}>
//#endregion

//#region Search TVshow types
type TMDBSearchTVShowQueryParams = {
  query: string
  first_air_date_year?: number
  include_adult?: boolean
  language?: string
  page?: number
  year?: string
}
const DEFAULT_TMDB_SEARCH_TV_SHOW_QUERY_PARAMS: TMDBSearchTVShowQueryParams = {
  query: '',
  include_adult: true,
  language: 'en-US',
  page: 1,
}
type TMDBSearchTVShowResponse = TMDBPagination<{
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}>
//#endregion

//#region Movie/TVShow genres
type TMDBGenreQueryParams = { language: string }
const DEFAULT_TMDB_GENRE_QUERY_PARAMS = { language: 'us' }
type TMDBGenreResponse = {
  genres: Array<{ id: number; name: string }>
}
//#endregion

export class TmdbService {
  async searchMovie(params: TMDBSearchMovieQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_SEARCH_MOVIE_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}search/movie?${qs}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
      })
      // @ts-ignore
      const json: TMDBSearchMovieResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.searchMovie.name}] Request failed.`, err)
      return null
    }
  }

  async searchTVShow(params: TMDBSearchTVShowQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_SEARCH_TV_SHOW_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}search/tv?${qs}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
      })
      // @ts-ignore
      const json: TMDBSearchTVShowResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.searchTVShow.name}] Request failed.`, err)
      return null
    }
  }

  async getMovieGenres(params: TMDBGenreQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_GENRE_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}genre/movie/list?${qs}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
      })
      // @ts-ignore
      const json: TMDBGenreResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.getMovieGenres.name}] Request failed.`, err)
      return null
    }
  }

  async getTVShowGenres(params: TMDBGenreQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_GENRE_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}genre/tv/list?${qs}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
      })
      // @ts-ignore
      const json: TMDBGenreResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.getTVShowGenres.name}] Request failed.`, err)
      return null
    }
  }
}
