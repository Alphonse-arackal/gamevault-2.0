import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  FiSearch,
  FiSliders,
  FiX
} from 'react-icons/fi'

import GameCard from '../components/GameCard'

import {
  getGamesAPI,
  getGenresAPI,
  getPlatformsAPI
} from '../services/rawgAPI'

import '../styles/games.css'


function Games() {

  const [searchParams, setSearchParams] =
    useSearchParams()


  // ============================
  // STATE
  // ============================

  const [games, setGames] = useState([])

  const [genres, setGenres] = useState([])

  const [platforms, setPlatforms] = useState([])


  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  )


  const [selectedGenre, setSelectedGenre] =
    useState(
      searchParams.get('genre') || ''
    )


  const [selectedPlatform, setSelectedPlatform] =
    useState(
      searchParams.get('platform') || ''
    )


  const [selectedRating, setSelectedRating] =
    useState(
      searchParams.get('rating') || ''
    )


  const [selectedSort, setSelectedSort] =
    useState(
      searchParams.get('ordering') || ''
    )


  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  // ============================
  // LOAD FILTER DATA
  // ============================

  useEffect(() => {

    fetchFilterData()

  }, [])


  const fetchFilterData = async () => {

    try {

      const [
        genresResponse,
        platformsResponse
      ] = await Promise.all([

        getGenresAPI(),

        getPlatformsAPI()

      ])


      setGenres(
        genresResponse.data.results || []
      )


      setPlatforms(
        platformsResponse.data.results || []
      )

    } catch (error) {

      console.error(
        'Failed to load filter data:',
        error
      )

    }

  }


  // ============================
  // LOAD GAMES
  // ============================

  useEffect(() => {

    fetchGames()

  }, [
    selectedGenre,
    selectedPlatform,
    selectedRating,
    selectedSort
  ])


  const fetchGames = async (
    searchValue = search
  ) => {

    try {

      setLoading(true)

      setError('')


      const params = {
        page_size: 20
      }


      // SEARCH

      if (searchValue.trim()) {

        params.search =
          searchValue.trim()

      }


      // GENRE

      if (selectedGenre) {

        params.genres =
          selectedGenre

      }


      // PLATFORM

      if (selectedPlatform) {

        params.platforms =
          selectedPlatform

      }


      // RATING

      if (selectedRating) {

        params.rating =
          selectedRating

      }


      // SORT

      if (selectedSort) {

        params.ordering =
          selectedSort

      }


      const response =
        await getGamesAPI(params)


      setGames(
        response.data.results || []
      )

    } catch (error) {

      console.error(
        'Failed to load games:',
        error
      )

      setError(
        'Unable to load games.'
      )

    } finally {

      setLoading(false)

    }

  }


  // ============================
  // SEARCH
  // ============================

  const handleSearch = (event) => {

    event.preventDefault()


    const searchValue =
      search.trim()


    updateURL({
      search: searchValue
    })


    fetchGames(searchValue)

  }


  // ============================
  // UPDATE URL
  // ============================

  const updateURL = (
    changes = {}
  ) => {

    const params =
      new URLSearchParams()


    const values = {

      search,

      genre:
        selectedGenre,

      platform:
        selectedPlatform,

      rating:
        selectedRating,

      ordering:
        selectedSort,

      ...changes

    }


    Object.entries(values).forEach(
      ([key, value]) => {

        if (value) {

          params.set(
            key,
            value
          )

        }

      }
    )


    setSearchParams(params)

  }


  // ============================
  // CLEAR SEARCH
  // ============================

  const clearSearch = () => {

    setSearch('')


    updateURL({
      search: ''
    })


    fetchGames('')

  }


  // ============================
  // FILTER HANDLERS
  // ============================

  const handleGenreChange = (
    event
  ) => {

    const value =
      event.target.value


    setSelectedGenre(value)


    updateURL({
      genre: value
    })

  }


  const handlePlatformChange = (
    event
  ) => {

    const value =
      event.target.value


    setSelectedPlatform(value)


    updateURL({
      platform: value
    })

  }


  const handleRatingChange = (
    event
  ) => {

    const value =
      event.target.value


    setSelectedRating(value)


    updateURL({
      rating: value
    })

  }


  const handleSortChange = (
    event
  ) => {

    const value =
      event.target.value


    setSelectedSort(value)


    updateURL({
      ordering: value
    })

  }


  // ============================
  // RESET
  // ============================

  const resetFilters = () => {

    setSearch('')

    setSelectedGenre('')

    setSelectedPlatform('')

    setSelectedRating('')

    setSelectedSort('')


    setSearchParams({})


    fetchGames('')

  }


  // ============================
  // TITLES
  // ============================

  const selectedGenreName =
    genres.find(
      genre =>
        String(genre.id) ===
        String(selectedGenre)
    )?.name


  // ============================
  // RENDER
  // ============================

  return (

    <div className="games-page">

      <div className="games-container">


        {/* ============================
            HEADER
        ============================ */}

        <div className="games-header">

          <span className="games-label">
            GAMEVAULT
          </span>


          <h1>

            {selectedGenreName ||
              'Explore Games'}

          </h1>


          <p>
            Discover games from every genre,
            platform and generation.
          </p>

        </div>


        {/* ============================
            SEARCH SECTION
        ============================ */}

        <div className="games-search-section">


          <div className="games-search-heading">

            <span>
              FIND YOUR NEXT GAME
            </span>


            <h2>
              Search the Vault
            </h2>


            <p>
              Search thousands of games and
              discover something new to play.
            </p>

          </div>


          <form
            className="games-search"
            onSubmit={handleSearch}
          >


            {/* SEARCH ICON */}

            <FiSearch
              className="search-icon"
            />


            {/* INPUT */}

            <input
              type="text"
              placeholder="Search for a game..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />


            {/* CLEAR */}

            {search && (

              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >

                <FiX />

              </button>

            )}


            {/* SEARCH */}

            <button
              type="submit"
              className="search-submit"
            >

              Search

            </button>

          </form>

        </div>


        {/* ============================
            FILTERS
        ============================ */}

        <div className="games-filters">


          <div className="games-filter-title">

            <FiSliders />

            <span>
              FILTER & SORT
            </span>

          </div>


          {/* GENRE */}

          <div className="filter-group">

            <label>
              Genre
            </label>


            <select
              value={selectedGenre}
              onChange={handleGenreChange}
            >

              <option value="">
                All Genres
              </option>


              {genres.map(
                genre => (

                  <option
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </option>

                )
              )}

            </select>

          </div>


          {/* PLATFORM */}

          <div className="filter-group">

            <label>
              Platform
            </label>


            <select
              value={selectedPlatform}
              onChange={
                handlePlatformChange
              }
            >

              <option value="">
                All Platforms
              </option>


              {platforms.map(
                platform => (

                  <option
                    key={platform.id}
                    value={platform.id}
                  >
                    {platform.name}
                  </option>

                )
              )}

            </select>

          </div>


          {/* RATING */}

          <div className="filter-group">

            <label>
              Rating
            </label>


            <select
              value={selectedRating}
              onChange={
                handleRatingChange
              }
            >

              <option value="">
                Any Rating
              </option>


              <option value="4">
                4+ ⭐
              </option>


              <option value="3">
                3+ ⭐
              </option>


              <option value="2">
                2+ ⭐
              </option>


              <option value="1">
                1+ ⭐
              </option>

            </select>

          </div>


          {/* SORT */}

          <div className="filter-group">

            <label>
              Sort
            </label>


            <select
              value={selectedSort}
              onChange={
                handleSortChange
              }
            >

              <option value="">
                Default
              </option>


              <option value="-rating">
                Highest Rated
              </option>


              <option value="-released">
                Newest Releases
              </option>


              <option value="released">
                Oldest Releases
              </option>


              <option value="-added">
                Most Added
              </option>


              <option value="name">
                Name A-Z
              </option>


              <option value="-name">
                Name Z-A
              </option>

            </select>

          </div>


          {/* RESET */}

          <button
            className="reset-filters"
            onClick={resetFilters}
            type="button"
          >

            <FiX />

            Reset

          </button>

        </div>


        {/* ============================
            RESULTS INFO
        ============================ */}

        {!loading &&
          !error && (

            <div className="games-results-info">

              <span>

                {games.length}
                {' '}
                {games.length === 1
                  ? 'Game'
                  : 'Games'}
                {' '}
                Found

              </span>


              {(selectedGenre ||
                selectedPlatform ||
                selectedRating ||
                selectedSort ||
                search) && (

                <button
                  onClick={resetFilters}
                  type="button"
                >

                  Clear All Filters

                </button>

              )}

            </div>

          )}


        {/* ============================
            LOADING
        ============================ */}

        {loading && (

          <div className="games-loading">

            {Array.from({
              length: 12
            }).map(
              (_, index) => (

                <div
                  className="games-loader"
                  key={index}
                />

              )
            )}

          </div>

        )}


        {/* ============================
            ERROR
        ============================ */}

        {!loading &&
          error && (

            <div className="games-error">

              <p>
                {error}
              </p>


              <button
                onClick={() =>
                  fetchGames()
                }
                type="button"
              >

                Try Again

              </button>

            </div>

          )}


        {/* ============================
            GAMES
        ============================ */}

        {!loading &&
          !error &&
          games.length > 0 && (

            <div className="games-grid">

              {games.map(
                game => (

                  <GameCard
                    key={game.id}
                    game={game}
                  />

                )
              )}

            </div>

          )}


        {/* ============================
            EMPTY
        ============================ */}

        {!loading &&
          !error &&
          games.length === 0 && (

            <div className="games-empty">

              <h2>
                No games found
              </h2>


              <p>
                Try changing your filters
                or search query.
              </p>

            </div>

          )}

      </div>

    </div>

  )

}


export default Games