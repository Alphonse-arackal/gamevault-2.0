import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  FiArrowLeft,
  FiHeart,
  FiPlus,
  FiCalendar,
  FiMonitor,
  FiStar
} from 'react-icons/fi'

import { useVault } from '../context/VaultContext'

import {
  getGameDetailsAPI,
  getGameScreenshotsAPI
} from '../services/rawgAPI'

import '../styles/gameDetails.css'


function GameDetails() {

  const { id } = useParams()

  const {
    isInVault,
    addToVault
  } = useVault()


  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isWishlisted, setIsWishlisted] = useState(false)


  // ============================
  // FETCH GAME DETAILS
  // ============================

  useEffect(() => {

    fetchGameDetails()

  }, [id])


  const fetchGameDetails = async () => {

    try {

      setLoading(true)
      setError('')


      const [
        gameResponse,
        screenshotsResponse
      ] = await Promise.all([

        getGameDetailsAPI(id),

        getGameScreenshotsAPI(id)

      ])


      setGame(
        gameResponse.data
      )


      setScreenshots(
        screenshotsResponse.data.results || []
      )


    } catch (error) {

      console.error(error)

      setError(
        'Unable to load game details.'
      )

    } finally {

      setLoading(false)

    }

  }


  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (

      <div className="game-details-loading">

        <div className="details-loader"></div>

      </div>

    )

  }


  // ============================
  // ERROR
  // ============================

  if (error || !game) {

    return (

      <div className="game-details-error">

        <h2>
          Something went wrong
        </h2>

        <p>
          {error || 'Game not found.'}
        </p>

        <Link to="/games">
          Back to Games
        </Link>

      </div>

    )

  }


  // ============================
  // VAULT STATUS
  // ============================

  const inVault = isInVault(game.id)


  // ============================
  // GAME DATA
  // ============================

  const genres =
    game.genres || []


  const platforms =
    game.platforms || []


  const developers =
    game.developers || []


  const publishers =
    game.publishers || []


  const stores =
    game.stores || []


  // ============================
  // RENDER
  // ============================

  return (

    <div className="game-details-page">


      {/* ============================
          HERO
      ============================ */}

      <section
        className="game-details-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(5,5,5,1) 0%,
              rgba(5,5,5,.85) 35%,
              rgba(5,5,5,.35) 70%,
              rgba(5,5,5,.8) 100%
            ),
            linear-gradient(
              0deg,
              #050505 0%,
              transparent 50%
            ),
            url(${game.background_image})
          `
        }}
      >

        <div className="game-details-hero-content">


          {/* BACK */}

          <Link
            to="/games"
            className="details-back"
          >

            <FiArrowLeft />

            Back to Games

          </Link>


          {/* GENRES */}

          <div className="details-genres">

            {genres
              .slice(0, 3)
              .map(genre => (

                <span key={genre.id}>
                  {genre.name}
                </span>

              ))}

          </div>


          {/* TITLE */}

          <h1>
            {game.name}
          </h1>


          {/* META */}

          <div className="details-meta">

            <span className="details-rating">

              <FiStar />

              {game.rating?.toFixed(1) || 'N/A'}

            </span>


            {game.released && (

              <span>

                {new Date(
                  game.released
                ).getFullYear()}

              </span>

            )}


            {game.esrb_rating && (

              <span>
                {game.esrb_rating.name}
              </span>

            )}

          </div>


          {/* PLATFORMS */}

          <div className="details-platforms">

            {platforms
              .slice(0, 6)
              .map(item => (

                <span
                  key={item.platform.id}
                >
                  {item.platform.name}
                </span>

              ))}

          </div>


          {/* ACTIONS */}

          <div className="details-actions">


            {/* WISHLIST */}

            <button
              className={`details-wishlist ${
                isWishlisted
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setIsWishlisted(
                  !isWishlisted
                )
              }
            >

              <FiHeart />

              {isWishlisted
                ? 'Wishlisted'
                : 'Wishlist'}

            </button>


            {/* VAULT */}

            <button
              className={`details-vault ${
                inVault
                  ? 'added'
                  : ''
              }`}
              onClick={() => {

                if (!inVault) {

                  addToVault(game)

                }

              }}
              disabled={inVault}
            >

              <FiPlus />

              {inVault
                ? 'In My Vault'
                : 'Add to Vault'}

            </button>


          </div>


        </div>

      </section>


      {/* ============================
          CONTENT
      ============================ */}

      <main className="game-details-content">


        {/* ============================
            ABOUT
        ============================ */}

        <section className="details-section">

          <div className="details-section-heading">

            <span>
              ABOUT
            </span>

            <h2>
              About the Game
            </h2>

          </div>


          <div
            className="details-description"
            dangerouslySetInnerHTML={{
              __html:
                game.description ||
                '<p>No description available.</p>'
            }}
          />

        </section>


        {/* ============================
            SCREENSHOTS
        ============================ */}

        {screenshots.length > 0 && (

          <section className="details-section">

            <div className="details-section-heading">

              <span>
                VISUALS
              </span>

              <h2>
                Screenshots
              </h2>

            </div>


            <div className="details-screenshots">

              {screenshots
                .slice(0, 6)
                .map(image => (

                  <div
                    className="details-screenshot"
                    key={image.id}
                  >

                    <img
                      src={image.image}
                      alt={`${game.name} screenshot`}
                    />

                  </div>

                ))}

            </div>

          </section>

        )}


        {/* ============================
            GAME INFORMATION
        ============================ */}

        <section className="details-section">

          <div className="details-section-heading">

            <span>
              INFORMATION
            </span>

            <h2>
              Game Details
            </h2>

          </div>


          <div className="details-info-grid">


            {/* RELEASE DATE */}

            <div className="details-info-item">

              <FiCalendar />

              <div>

                <span>
                  RELEASE DATE
                </span>

                <strong>
                  {game.released || 'TBA'}
                </strong>

              </div>

            </div>


            {/* PLATFORMS */}

            <div className="details-info-item">

              <FiMonitor />

              <div>

                <span>
                  PLATFORMS
                </span>

                <strong>
                  {platforms
                    .slice(0, 3)
                    .map(
                      item =>
                        item.platform.name
                    )
                    .join(', ') || 'N/A'}
                </strong>

              </div>

            </div>


            {/* RATING */}

            <div className="details-info-item">

              <FiStar />

              <div>

                <span>
                  RATING
                </span>

                <strong>
                  {game.rating || 'N/A'} / 5
                </strong>

              </div>

            </div>


            {/* METACRITIC */}

            <div className="details-info-item">

              <div>

                <span>
                  METACRITIC
                </span>

                <strong>
                  {game.metacritic || 'N/A'}
                </strong>

              </div>

            </div>


            {/* DEVELOPERS */}

            <div className="details-info-item">

              <div>

                <span>
                  DEVELOPERS
                </span>

                <strong>
                  {developers
                    .map(
                      developer =>
                        developer.name
                    )
                    .join(', ') || 'N/A'}
                </strong>

              </div>

            </div>


            {/* PUBLISHERS */}

            <div className="details-info-item">

              <div>

                <span>
                  PUBLISHERS
                </span>

                <strong>
                  {publishers
                    .map(
                      publisher =>
                        publisher.name
                    )
                    .join(', ') || 'N/A'}
                </strong>

              </div>

            </div>


          </div>

        </section>


        {/* ============================
            GENRES
        ============================ */}

        {genres.length > 0 && (

          <section className="details-section">

            <div className="details-section-heading">

              <span>
                CATEGORIES
              </span>

              <h2>
                Genres
              </h2>

            </div>


            <div className="details-genre-list">

              {genres.map(
                genre => (

                  <Link
                    key={genre.id}
                    to={`/games?genre=${genre.id}`}
                  >
                    {genre.name}
                  </Link>

                )
              )}

            </div>

          </section>

        )}


        {/* ============================
            STORES
        ============================ */}

        {stores.length > 0 && (

          <section className="details-section">

            <div className="details-section-heading">

              <span>
                WHERE TO PLAY
              </span>

              <h2>
                Available On
              </h2>

            </div>


            <div className="details-stores">

              {stores
                .slice(0, 6)
                .map(store => (

                  <div
                    key={store.id}
                    className="details-store"
                  >

                    {store.store?.name}

                  </div>

                ))}

            </div>

          </section>

        )}


      </main>

    </div>

  )

}


export default GameDetails