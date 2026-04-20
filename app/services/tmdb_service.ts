import env from '#start/env'
import logger from '@adonisjs/core/services/logger'

const TMDB_BASE_URL = 'https://api.themoviedb.org'
const TMDB_API_VERSION = '3'
const TMDB_API_URL = `${TMDB_BASE_URL}/${TMDB_API_VERSION}/`

//#region Common types
export type TMDBPagination<T> = {
  page: number
  results: Array<T>
  total_pages: number
  total_results: number
}
//#endregion

//#region Genre types
type TMDBGenre = {
  id: number
  name: string
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
export type TMDBSearchMovie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
//#endregion

//#region Get Movie by id types
type TMDBMovieDetailsQueryParams = {
  append_to_response?: string
  language?: string
}
type TMDBMovieDetailsResponse = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: Array<TMDBGenre>
  homepage: string
  id: number
  imdb_id: string
  origin_country: Array<string>
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<{
    id: number
    logo_path: string
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
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
export type TMDBSearchTVShow = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}
//#endregion

//#region Get TVShow by id
type TMDBTvShowDetailsQueryParams = {
  append_to_response?: string
  language?: string
}
type TMDBTvShowDetailsResponse = {
  adult: boolean
  backdrop_path: string
  created_by: Array<{
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
  }>
  episode_run_time: Array<number>
  first_air_date: string
  genres: Array<TMDBGenre>
  homepage: string
  id: number
  in_production: boolean
  languages: Array<string>
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  name: string
  next_episode_to_air: string | null
  networks: Array<{
    id: number
    logo_path: string
    name: string
    origin_country: string
  }>
  number_of_episodes: number
  number_of_seasons: number
  origin_country: Array<string>
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<{
    id: number
    logo_path: string
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  seasons: Array<{
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
  }>
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}
//#endregion

//#region Movie/TVShow genres
type TMDBGenreQueryParams = { language: string }
const DEFAULT_TMDB_GENRE_QUERY_PARAMS = { language: 'us' }
type TMDBGenreResponse = {
  genres: Array<TMDBGenre>
}
//#endregion

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${env.get('TMDB_API_KEY')}`,
  },
}

export class TmdbService {
  async searchMovie(
    params: TMDBSearchMovieQueryParams
  ): Promise<TMDBPagination<TMDBSearchMovie> | null> {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_SEARCH_MOVIE_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}search/movie?${qs}`, DEFAULT_REQUEST_OPTIONS)
      // @ts-ignore
      const json: TMDBPagination<TMDBSearchMovie> = await req.json()
      return {
        ...json,
        results: json.results.map((m) => ({
          ...m,
          poster_path: m.poster_path ? this.formatPosterImageUrl(m.poster_path, 'w92') : null,
        })),
      }
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.searchMovie.name}] Request failed.`, err)
      return null
    }
  }

  async getMovieById(id: number, params?: TMDBMovieDetailsQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...(params || {}) })
      const req = await fetch(`${TMDB_API_URL}movie/${id}?${qs}`, DEFAULT_REQUEST_OPTIONS)
      // @ts-ignore
      const json: TMDBMovieDetailsResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.getMovieById.name}] Request failed.`, err)
      return null
    }
  }

  async searchTVShow(
    params: TMDBSearchTVShowQueryParams
  ): Promise<TMDBPagination<TMDBSearchTVShow> | null> {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_SEARCH_TV_SHOW_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}search/tv?${qs}`, DEFAULT_REQUEST_OPTIONS)
      // @ts-ignore
      const json: TMDBPagination<TMDBSearchTVShow> = await req.json()
      return {
        ...json,
        results: json.results.map((tvshow) => ({
          ...tvshow,
          poster_path: tvshow.poster_path
            ? this.formatPosterImageUrl(tvshow.poster_path, 'w92')
            : null,
        })),
      }
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.searchTVShow.name}] Request failed.`, err)
      return null
    }
  }

  async getTVShowById(id: number, params?: TMDBTvShowDetailsQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...(params || {}) })
      const req = await fetch(`${TMDB_API_URL}tv/${id}?${qs}`, DEFAULT_REQUEST_OPTIONS)
      // @ts-ignore
      const json: TMDBTvShowDetailsResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.getTVShowById.name}] Request failed.`, err)
      return null
    }
  }

  async getMovieGenres(params: TMDBGenreQueryParams) {
    try {
      // @ts-ignore
      const qs = new URLSearchParams({ ...DEFAULT_TMDB_GENRE_QUERY_PARAMS, ...params })
      const req = await fetch(`${TMDB_API_URL}genre/movie/list?${qs}`, DEFAULT_REQUEST_OPTIONS)
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
      const req = await fetch(`${TMDB_API_URL}genre/tv/list?${qs}`, DEFAULT_REQUEST_OPTIONS)
      // @ts-ignore
      const json: TMDBGenreResponse = await req.json()
      return json
    } catch (err) {
      logger.error(`[${TmdbService.name}.${this.getTVShowGenres.name}] Request failed.`, err)
      return null
    }
  }

  /**
   * Complete the TMDB poster image path to an URL.
   *
   * Based the document: https://developer.themoviedb.org/docs/image-basics
   *
   * Image size are available here: https://developer.themoviedb.org/reference/configuration-details
   *
   * @param path Path to the image (eg: /1E5baAaEse26fej7uHcjOgEE2t2.jpg)
   */
  formatPosterImageUrl(
    path: string,
    size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w342'
  ) {
    return `https://image.tmdb.org/t/p/${size}${path}`
  }
}
