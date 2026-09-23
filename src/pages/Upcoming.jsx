import { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'

import GameCard from '../components/GameCard'

import {
  getUpcomingGamesAPI
} from '../services/rawgAPI'

import '../styles/upcoming.css'


function Upcoming() {

  const [games, setGames] = useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  // ============================
  // FETCH UPCOMING GAMES
  // ============================

  useEffect(() => {

    fetchUpcomingGames()

  }, [])


  const fetchUpcomingGames = async () => {

    try {

      setLoading(true)

      setError('')


      const response =
        await getUpcomingGamesAPI()


      setGames(
        response.data.results || []
      )

    } catch (error) {

      console.error(
        'Failed to load upcoming games:',
        error
      )

      setError(
        'Unable to load upcoming games.'
      )

    } finally {

      setLoading(false)

    }

  }


  // ============================
  // FORMAT DATE
  // ============================

  const formatReleaseDate = (
    date
  ) => {

    if (!date) {
      return 'TBA'
    }


    return new Date(
      date
    ).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    )

  }


  // ============================
  // RENDER
  // ============================

  return (

    <div className="upcoming-page">

      <div className="upcoming-container">


        {/* ============================
            HEADER
        ============================ */}

        <header className="upcoming-header">

          <div>

            <span className="upcoming-label">
              GAMEVAULT
            </span>


            <h1>
              Upcoming
            </h1>


            <p>
              Keep track of games arriving
              in the months ahead.
            </p>

          </div>


          <div className="upcoming-icon">

            <FiCalendar />

          </div>

        </header>


        {/* ============================
            RESULTS INFO
        ============================ */}

        {!loading &&
          !error &&
          games.length > 0 && (

            <div className="upcoming-results">

              <span>
                {games.length} Upcoming Games
              </span>

              <span>
                RELEASE CALENDAR
              </span>

            </div>

          )}


        {/* ============================
            LOADING
        ============================ */}

        {loading && (

          <div className="upcoming-grid">

            {Array.from({
              length: 8
            }).map((_, index) => (

              <div
                key={index}
                className="upcoming-loader"
              />

            ))}

          </div>

        )}


        {/* ============================
            ERROR
        ============================ */}

        {!loading &&
          error && (

            <div className="upcoming-error">

              <h2>
                Something went wrong
              </h2>


              <p>
                {error}
              </p>


              <button
                onClick={fetchUpcomingGames}
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

            <div className="upcoming-grid">

              {games.map(game => (

                <article
                  className="upcoming-card"
                  key={game.id}
                >


                  {/* RELEASE DATE */}

                  <div className="upcoming-date">

                    <FiCalendar />

                    <span>
                      {formatReleaseDate(
                        game.released
                      )}
                    </span>

                  </div>


                  {/* GAME CARD */}

                  <GameCard
                    game={game}
                  />

                </article>

              ))}

            </div>

          )}


        {/* ============================
            EMPTY
        ============================ */}

        {!loading &&
          !error &&
          games.length === 0 && (

            <div className="upcoming-empty">

              <h2>
                No upcoming games found
              </h2>


              <p>
                There are no upcoming releases
                available right now.
              </p>

            </div>

          )}

      </div>

    </div>

  )

}


export default Upcoming