import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiChevronDown } from 'react-icons/fi'

import { useVault } from '../context/VaultContext'

import '../styles/vault.css'


function Vault() {

  const {
    vault,
    loading,
    updateStatus,
    removeFromVault
  } = useVault()


  const [activeFilter, setActiveFilter] =
    useState('all')


  // ============================
  // FILTERS
  // ============================

  const filters = [
    {
      id: 'all',
      label: 'All Games'
    },
    {
      id: 'want-to-play',
      label: 'Want to Play'
    },
    {
      id: 'playing',
      label: 'Playing'
    },
    {
      id: 'completed',
      label: 'Completed'
    },
    {
      id: 'dropped',
      label: 'Dropped'
    }
  ]


  // ============================
  // FILTER VAULT
  // ============================

  const filteredGames =
    activeFilter === 'all'
      ? vault
      : vault.filter(
          game =>
            game.status === activeFilter
        )


  // ============================
  // STATUS LABEL
  // ============================

  const getStatusLabel = status => {

    switch (status) {

      case 'want-to-play':
        return 'Want to Play'

      case 'playing':
        return 'Playing'

      case 'completed':
        return 'Completed'

      case 'dropped':
        return 'Dropped'

      default:
        return 'Want to Play'

    }

  }


  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (

      <div className="vault-page">

        <div className="vault-container">

          <div className="vault-header">

            <span className="vault-label">
              GAMEVAULT
            </span>

            <h1>
              My Vault
            </h1>

          </div>


          <div className="vault-loading">

            {Array.from({
              length: 8
            }).map((_, index) => (

              <div
                key={index}
                className="vault-loader"
              />

            ))}

          </div>

        </div>

      </div>

    )

  }


  // ============================
  // RENDER
  // ============================

  return (

    <div className="vault-page">

      <div className="vault-container">


        {/* ============================
            HEADER
        ============================ */}

        <div className="vault-header">

          <div>

            <span className="vault-label">
              GAMEVAULT
            </span>

            <h1>
              My Vault
            </h1>

            <p>
              Your personal collection of games.
            </p>

          </div>


          <div className="vault-count">

            <strong>
              {vault.length}
            </strong>

            <span>
              {vault.length === 1
                ? 'GAME'
                : 'GAMES'}
            </span>

          </div>

        </div>


        {/* ============================
            FILTER TABS
        ============================ */}

        <div className="vault-filters">

          {filters.map(filter => (

            <button
              key={filter.id}
              className={
                activeFilter === filter.id
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setActiveFilter(filter.id)
              }
            >

              {filter.label}

              <span>

                {filter.id === 'all'
                  ? vault.length
                  : vault.filter(
                      game =>
                        game.status ===
                        filter.id
                    ).length}

              </span>

            </button>

          ))}

        </div>


        {/* ============================
            EMPTY VAULT
        ============================ */}

        {vault.length === 0 && (

          <div className="vault-empty">

            <div className="vault-empty-icon">
              +
            </div>

            <h2>
              Your vault is empty
            </h2>

            <p>
              Start exploring games and
              add them to your personal vault.
            </p>

            <Link
              to="/games"
              className="vault-browse"
            >
              Explore Games
            </Link>

          </div>

        )}


        {/* ============================
            EMPTY FILTER
        ============================ */}

        {vault.length > 0 &&
          filteredGames.length === 0 && (

          <div className="vault-empty">

            <div className="vault-empty-icon">
              +
            </div>

            <h2>
              No games here
            </h2>

            <p>
              You don't have any games
              in this category yet.
            </p>

          </div>

        )}


        {/* ============================
            GAMES
        ============================ */}

        {filteredGames.length > 0 && (

          <div className="vault-grid">

            {filteredGames.map(game => (

              <article
                key={game.id}
                className="vault-card"
              >


                {/* IMAGE */}

                <Link
                  to={`/game/${game.rawgId}`}
                  className="vault-card-image"
                >

                  <img
                    src={
                      game.background_image
                    }
                    alt={game.name}
                  />

                </Link>


                {/* CONTENT */}

                <div className="vault-card-content">


                  <div className="vault-card-top">

                    <Link
                      to={`/game/${game.rawgId}`}
                    >

                      <h3>
                        {game.name}
                      </h3>

                    </Link>


                    <button
                      className="vault-remove"
                      onClick={() =>
                        removeFromVault(
                          game.rawgId
                        )
                      }
                      title="Remove from vault"
                    >

                      <FiTrash2 />

                    </button>

                  </div>


                  {/* RATING */}

                  <div className="vault-card-rating">

                    <span>
                      ★
                    </span>

                    {game.rating
                      ? game.rating.toFixed(1)
                      : 'N/A'}

                  </div>


                  {/* STATUS */}

                  <div className="vault-status">

                    <span className="vault-status-label">
                      STATUS
                    </span>


                    <div className="vault-status-select">

                      <select
                        value={
                          game.status ||
                          'want-to-play'
                        }
                        onChange={event =>
                          updateStatus(
                            game.rawgId,
                            event.target.value
                          )
                        }
                      >

                        <option value="want-to-play">
                          Want to Play
                        </option>

                        <option value="playing">
                          Playing
                        </option>

                        <option value="completed">
                          Completed
                        </option>

                        <option value="dropped">
                          Dropped
                        </option>

                      </select>

                      <FiChevronDown />

                    </div>

                  </div>


                  {/* RELEASE */}

                  <span className="vault-release">

                    {game.released
                      ? new Date(
                          game.released
                        ).getFullYear()
                      : 'TBA'}

                  </span>


                  <span className="vault-current-status">

                    {getStatusLabel(
                      game.status ||
                      'want-to-play'
                    )}

                  </span>


                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </div>

  )

}


export default Vault