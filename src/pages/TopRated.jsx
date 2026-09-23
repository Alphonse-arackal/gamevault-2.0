import { useEffect, useState } from 'react'
import { FiStar } from 'react-icons/fi'

import GameCard from '../components/GameCard'

import {
  getTopRatedGamesAPI
} from '../services/rawgAPI'

import '../styles/topRated.css'


function TopRated() {

  const [games, setGames] = useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  // ============================
  // FETCH TOP RATED GAMES
  // ============================

  useEffect(() => {

    fetchTopRatedGames()

  }, [])


  const fetchTopRatedGames = async () => {

    try {

      setLoading(true)

      setError('')


      const response =
        await getTopRatedGamesAPI()


      setGames(
        response.data.results || []
      )

    } catch (error) {

      console.error(
        'Failed to load top rated games:',
        error
      )

      setError(
        'Unable to load top rated games.'
      )

    } finally {

      setLoading(false)

    }

  }


  // ============================
  // RENDER
  // ============================

  return (

    <div className="top-rated-page">

      <div className="top-rated-container">


        {/* ============================
            HEADER
        ============================ */}

        <header className="top-rated-header">

          <div>

            <span className="top-rated-label">
              GAMEVAULT
            </span>


            <h1>
              Top Rated
            </h1>


            <p>
              Explore some of the highest-rated
              games in the GameVault collection.
            </p>

          </div>


          <div className="top-rated-icon">

            <FiStar />

          </div>

        </header>


        {/* ============================
            RESULTS INFO
        ============================ */}

        {!loading &&
          !error &&
          games.length > 0 && (

            <div className="top-rated-results">

              <span>
                {games.length} Games
              </span>

              <span>
                SORTED BY RATING
              </span>

            </div>

          )}


        {/* ============================
            LOADING
        ============================ */}

        {loading && (

          <div className="top-rated-grid">

            {Array.from({
              length: 8
            }).map((_, index) => (

              <div
                key={index}
                className="top-rated-loader"
              />

            ))}

          </div>

        )}


        {/* ============================
            ERROR
        ============================ */}

        {!loading &&
          error && (

            <div className="top-rated-error">

              <h2>
                Something went wrong
              </h2>


              <p>
                {error}
              </p>


              <button
                onClick={fetchTopRatedGames}
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

            <div className="top-rated-grid">

              {games.map(
                (game, index) => (

                  <div
                    className="top-rated-card-wrapper"
                    key={game.id}
                  >

                    {/* RANK */}

                    <div className="top-rated-rank">

                      <span>
                        {String(
                          index + 1
                        ).padStart(2, '0')}
                      </span>

                    </div>


                    <GameCard
                      game={game}
                    />

                  </div>

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

            <div className="top-rated-empty">

              <h2>
                No games found
              </h2>


              <p>
                There are no top-rated games
                available right now.
              </p>

            </div>

          )}

      </div>

    </div>

  )

}


export default TopRated