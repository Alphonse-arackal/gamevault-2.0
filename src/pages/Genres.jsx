import { useEffect, useState } from 'react'

import GenreCard from '../components/GenreCard'

import { getGenresAPI } from '../services/rawgAPI'

import '../styles/genres.css'

function Genres() {

  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await getGenresAPI()

      setGenres(response.data.results || [])

    } catch (error) {

      console.error(error)

      setError('Unable to load genres.')

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="genres-page">

      <div className="genres-container">

        {/* HEADER */}

        <div className="genres-header">

          <span className="genres-label">
            GAMEVAULT
          </span>

          <h1>
            Explore by Genre
          </h1>

          <p>
            Discover games across different genres
            and find your next adventure.
          </p>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="genres-loading">

            <div className="genre-loader"></div>
            <div className="genre-loader"></div>
            <div className="genre-loader"></div>
            <div className="genre-loader"></div>
            <div className="genre-loader"></div>
            <div className="genre-loader"></div>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="genres-error">

            <p>{error}</p>

            <button onClick={fetchGenres}>
              Try Again
            </button>

          </div>

        )}


        {/* GENRES */}

        {!loading && !error && (

          <div className="genres-grid">

            {genres.map((genre) => (

              <GenreCard
                key={genre.id}
                genre={genre}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default Genres