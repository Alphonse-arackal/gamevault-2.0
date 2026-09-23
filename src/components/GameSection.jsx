import GameCard from './GameCard'

import '../styles/gameSection.css'


function GameSection({
  label,
  title,
  games = [],
  loading = false
}) {

  return (

    <section className="game-section">

      <div className="game-section-header">

        <div>

          <span className="game-section-label">
            {label}
          </span>

          <h2>
            {title}
          </h2>

        </div>

      </div>


      {loading ? (

        <div className="game-section-loading">

          <div className="section-loader"></div>
          <div className="section-loader"></div>
          <div className="section-loader"></div>
          <div className="section-loader"></div>

        </div>

      ) : (

        <div className="game-section-grid">

          {games.map((game) => (

            <GameCard
              key={game.id}
              game={game}
            />

          ))}

        </div>

      )}

    </section>

  )
}


export default GameSection