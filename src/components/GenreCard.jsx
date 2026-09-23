import { Link } from 'react-router-dom'
import '../styles/genreCard.css'

function GenreCard({ genre }) {

  return (
    <Link
      to={`/games?genre=${genre.id}`}
      className="genre-card"
    >

      <div className="genre-card-content">

        <span className="genre-card-label">
          EXPLORE
        </span>

        <h2>
          {genre.name}
        </h2>

        <p>
          {genre.games_count || 0} Games
        </p>

      </div>

      <div className="genre-card-arrow">
        →
      </div>

    </Link>
  )
}

export default GenreCard