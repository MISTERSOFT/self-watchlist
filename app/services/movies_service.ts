import Movie from '#models/movie'

export class MoviesService {
  /**
   * Get user's TMDB movie ids.
   *
   * @param userId User id attached to movies
   * @returns User's TMDB movie ids list
   */
  async getMoviesTMDBIdsByUser(userId: number) {
    const movies = await Movie.query()
      .select('external_source_id')
      .andWhereHas('users', (queryUsers) => {
        queryUsers.where('user_id', userId)
      })

    return movies.map((movie) => +movie.externalSourceId!)
  }
}
