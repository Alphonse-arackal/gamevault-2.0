import { Link } from 'react-router-dom'

import { useWishlist } from '../context/WishlistContext'
import GameCard from '../components/GameCard'

import '../styles/wishlist.css'

function Wishlist() {

  const {
    wishlist,
    loading
  } = useWishlist()


  if (loading) {

    return (

      <div className="wishlist-page">

        <div className="wishlist-container">

          <div className="wishlist-header">

            <span className="wishlist-label">
              GAMEVAULT
            </span>

            <h1>
              My Wishlist
            </h1>

          </div>


          <div className="wishlist-loading">

            {Array.from(
              { length: 8 }
            ).map((_, index) => (

              <div
                key={index}
                className="wishlist-loader"
              />

            ))}

          </div>

        </div>

      </div>

    )

  }


  return (

    <div className="wishlist-page">

      <div className="wishlist-container">


        {/* HEADER */}

        <div className="wishlist-header">

          <div>

            <span className="wishlist-label">
              GAMEVAULT
            </span>

            <h1>
              My Wishlist
            </h1>

            <p>
              Games you want to play later.
            </p>

          </div>


          <div className="wishlist-count">

            <strong>
              {wishlist.length}
            </strong>

            <span>
              {wishlist.length === 1
                ? 'GAME'
                : 'GAMES'}
            </span>

          </div>

        </div>


        {/* EMPTY */}

        {wishlist.length === 0 && (

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              ♡
            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              Start exploring games and
              save the ones you want to
              play later.
            </p>

            <Link
              href="/games"
              className="wishlist-browse"
            >
              Explore Games
            </Link>

          </div>

        )}


        {/* GAMES */}

        {wishlist.length > 0 && (

          <div className="wishlist-grid">

            {wishlist.map((game) => (

              <GameCard
                key={game.id}
                game={{
                  id: game.rawgId,
                  name: game.name,
                  background_image:
                    game.background_image,
                  rating: game.rating,
                  released: game.released,
                  genres: game.genres,
                  platforms: game.platforms
                }}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  )

}

export default Wishlist