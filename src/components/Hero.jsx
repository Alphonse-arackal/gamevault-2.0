import { Link } from 'react-router-dom'
import { FiHeart, FiArrowRight } from 'react-icons/fi'

import '../styles/hero.css'

function Hero({ game }) {

  if (!game) {
    return null
  }

  const genres = game.genres?.slice(0, 2) || []

  const platforms = game.platforms?.slice(0, 3) || []

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(5, 5, 5, 1) 0%,
            rgba(5, 5, 5, 0.85) 35%,
            rgba(5, 5, 5, 0.35) 70%,
            rgba(5, 5, 5, 0.8) 100%
          ),
          linear-gradient(
            0deg,
            #050505 0%,
            transparent 35%
          ),
          url(${game.background_image})
        `
      }}
    >

      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-label">
            FEATURED GAME
          </span>

          <h1 className="hero-title">
            {game.name}
          </h1>

          <div className="hero-meta">

            <span className="hero-rating">
              ★ {game.rating}
            </span>

            {game.released && (
              <span>
                {new Date(game.released).getFullYear()}
              </span>
            )}

            {genres.map((genre) => (
              <span key={genre.id}>
                {genre.name}
              </span>
            ))}

          </div>


          {game.platforms?.length > 0 && (

            <div className="hero-platforms">

              {platforms.map((item) => (

                <span key={item.platform.id}>
                  {item.platform.name}
                </span>

              ))}

            </div>

          )}


          <p className="hero-description">
            Discover {game.name}, explore its world,
            check screenshots and trailers, and add it
            to your GameVault.
          </p>


          <div className="hero-buttons">

            <Link
              to={`/game/${game.id}`}
              className="hero-primary-button"
            >
              Explore Game
              <FiArrowRight />
            </Link>


            <button className="hero-secondary-button">

              <FiHeart />

              Wishlist

            </button>

          </div>

        </div>

      </div>


      <div className="hero-scroll">

        <span>
          SCROLL TO EXPLORE
        </span>

        <div className="hero-scroll-line"></div>

      </div>

    </section>
  )
}

export default Hero