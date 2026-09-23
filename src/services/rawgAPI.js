import axios from 'axios'

const RAWG_BASE_URL = 'https://api.rawg.io/api'

const rawgAPI = axios.create({
  baseURL: RAWG_BASE_URL,
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY
  }
})


// =========================
// GAMES
// =========================

export const getGamesAPI = (params = {}) => {
  return rawgAPI.get('/games', {
    params
  })
}


// =========================
// GAME DETAILS
// =========================

export const getGameDetailsAPI = (id) => {
  return rawgAPI.get(`/games/${id}`)
}


// =========================
// SCREENSHOTS
// =========================

export const getGameScreenshotsAPI = (id) => {
  return rawgAPI.get(`/games/${id}/screenshots`)
}


// =========================
// TRAILERS
// =========================

export const getGameMoviesAPI = (id) => {
  return rawgAPI.get(`/games/${id}/movies`)
}


// =========================
// GENRES
// =========================

export const getGenresAPI = () => {
  return rawgAPI.get('/genres')
}


// =========================
// SEARCH
// =========================

export const searchGamesAPI = (query) => {
  return rawgAPI.get('/games', {
    params: {
      search: query
    }
  })
}


// =========================
// POPULAR
// =========================

export const getPopularGamesAPI = () => {
  return getGamesAPI({
    ordering: '-rating',
    page_size: 8
  })
}


// =========================
// TRENDING
// =========================

export const getTrendingGamesAPI = () => {
  return getGamesAPI({
    ordering: '-added',
    page_size: 8
  })
}


// =========================
// NEW RELEASES
// =========================

export const getNewReleasesAPI = () => {

  const today = new Date()

  const currentDate =
    today.toISOString().split('T')[0]

  const previousDate = new Date()

  previousDate.setDate(
    previousDate.getDate() - 180
  )

  const previousDateFormatted =
    previousDate.toISOString().split('T')[0]

  return getGamesAPI({
    dates: `${previousDateFormatted},${currentDate}`,
    ordering: '-released',
    page_size: 8
  })

}


// =========================
// UPCOMING
// =========================

export const getUpcomingGamesAPI = () => {

  const today = new Date()

  const currentDate =
    today.toISOString().split('T')[0]

  const futureDate = new Date()

  futureDate.setDate(
    futureDate.getDate() + 365
  )

  const futureDateFormatted =
    futureDate.toISOString().split('T')[0]

  return getGamesAPI({
    dates: `${currentDate},${futureDateFormatted}`,
    ordering: 'released',
    page_size: 8
  })

}


// =========================
// TOP RATED
// =========================

export const getTopRatedGamesAPI = () => {
  return getGamesAPI({
    ordering: '-rating',
    page_size: 8
  })
}

// PLATFORMS

export const getPlatformsAPI = () => {
  return rawgAPI.get('/platforms', {
    params: {
      page_size: 50
    }
  })
}