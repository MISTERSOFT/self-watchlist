# Self Watchlist

A watchlist app that brings in one place anime, movies, and TV shows.

## Key features

- [ ] Search into:
  - [ ] TMDB API
  - [ ] Anilist API
- [ ] Browse your watchlist
- [ ] Filter your watchlist
- [ ] Add or remove
- [ ] Detailed view page
- [ ] Mark element as "watched" / "to watch" / "dropped"

## Project

### Stack

- Dev Containers
- AdonisJS 7 with Inertia
- SQLite
- React with Shadcn & Tailwindcss

### Requirements

- Docker
- VSCode
- VSCode Dev Containers plugin
- [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

### Run dev environment

1. Open the project
2. Press `F1` and select `Dev Containers: Open in Container`

To exit the Dev Container, press `F1` and select `Dev Containers: Reopen Folder Locally`

## Production

### Requirements

- Docker

### Run (TODO)

Use the Docker compose:

```shell
docker compose up -f docker-compose.prod.yaml
```
