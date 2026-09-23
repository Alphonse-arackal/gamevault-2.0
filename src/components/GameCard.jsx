import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiHeart,
  FiPlay
} from 'react-icons/fi'

import {
  getGameMoviesAPI
} from '../services/rawgAPI'

import {
  useWishlist
} from '../context/WishlistContext'

import '../styles/gameCard.css'

function GameCard({ game }) {

  const videoRef = useRef(null)
  const hoverTimerRef = useRef(null)

  const [trailer, setTrailer] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [trailerLoading, setTrailerLoading] =
    useState(false)

  const {
    isWishlisted,
    toggleWishlist
  } = useWishlist()


  const wishlisted = isWishlisted(game.id)


  const loadTrailer = async () => {

    if (trailer || trailerLoading) return

    try {

      setTrailerLoading(true)

      const response =
        await getGameMoviesAPI(game.id)

      const movies =
        response.data.results

      if (
        movies &&
        movies.length > 0
      ) {

        const selectedTrailer =
          movies.find(
            movie => movie.data?.max
          ) ||
          movies.find(
            movie => movie.data?.['480']
          ) ||
          movies[0]

        setTrailer(selectedTrailer)

      }

    } catch (error) {

      console.error(
        `Failed to load trailer for ${game.name}`,
        error
      )

    } finally {

      setTrailerLoading(false)

    }

  }


  const handleMouseEnter = () => {

    setIsHovered(true)

    hoverTimerRef.current =
      setTimeout(() => {
        loadTrailer()
      }, 300)

  }


  const handleMouseLeave = () => {

    setIsHovered(false)

    clearTimeout(
      hoverTimerRef.current
    )

    if (videoRef.current) {

      videoRef.current.pause()

      videoRef.current.currentTime = 0

    }

  }


  useEffect(() => {

    if (
      isHovered &&
      trailer &&
      videoRef.current
    ) {

      videoRef.current
        .play()
        .catch(() => {})

    }

  }, [isHovered, trailer])


  useEffect(() => {

    return () => {

      clearTimeout(
        hoverTimerRef.current
      )

    }

  }, [])


  const handleWishlist = async (event) => {

    event.preventDefault()

    event.stopPropagation()

    await toggleWishlist(game)

  }


  const releaseYear = game.released
    ? new Date(
        game.released
      ).getFullYear()
    : 'TBA'


  const platforms =
    game.platforms
      ?.slice(0, 3)
      .map(
        item =>
          item.platform.name
      )
      .join(' • ')


  return (

    <article
      className="game-card"

      onMouseEnter={
        handleMouseEnter
      }

      onMouseLeave={
        handleMouseLeave
      }
    >

      <div className="game-card-media">

        <img
          src={game.background_image}
          alt={game.name}
          className={`
            game-card-image
            ${
              isHovered && trailer
                ? 'game-card-image-hidden'
                : ''
            }
          `}
        />


        {trailer && (

          <video
            ref={videoRef}

            className={`
              game-card-video
              ${
                isHovered
                  ? 'game-card-video-visible'
                  : ''
              }
            `}

            src={
              trailer.data?.max ||
              trailer.data?.['480']
            }

            muted
            loop
            playsInline
            preload="metadata"
          />

        )}


        <div className="game-card-overlay"></div>


        {trailer &&
          isHovered && (

          <div className="game-card-preview-label">

            <FiPlay />

            Preview

          </div>

        )}


        {trailerLoading &&
          isHovered && (

          <div className="game-card-loading">

            Loading preview...

          </div>

        )}


        {/* WISHLIST */}

        <button
          className={`
            game-card-wishlist
            ${
              wishlisted
                ? 'active'
                : ''
            }
          `}

          onClick={
            handleWishlist
          }

          aria-label={
            wishlisted
              ? `Remove ${game.name} from wishlist`
              : `Add ${game.name} to wishlist`
          }
        >

          <FiHeart
            className={
              wishlisted
                ? 'heart-filled'
                : ''
            }
          />

        </button>


        {/* RATING */}

        <div className="game-card-rating">

          <span>
            ★
          </span>

          {game.rating?.toFixed(1) ||
            'N/A'}

        </div>

      </div>


      <Link
        to={`/game/${game.id}`}
        className="game-card-info"
      >

        <span className="game-card-release">

          {releaseYear}

        </span>


        <h3 className="game-card-title">

          {game.name}

        </h3>


        {platforms && (

          <p className="game-card-platforms">

            {platforms}

          </p>

        )}

      </Link>

    </article>

  )

}

export default GameCard