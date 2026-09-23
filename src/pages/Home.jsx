import { useEffect, useState } from 'react'

import Hero from '../components/Hero'
import GameSection from '../components/GameSection'

import {
  getPopularGamesAPI,
  getTrendingGamesAPI,
  getNewReleasesAPI,
  getUpcomingGamesAPI,
  getTopRatedGamesAPI
} from '../services/rawgAPI'


function Home() {

  const [featuredGame, setFeaturedGame] = useState(null)

  const [popularGames, setPopularGames] = useState([])
  const [trendingGames, setTrendingGames] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [upcomingGames, setUpcomingGames] = useState([])
  const [topRatedGames, setTopRatedGames] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')


  useEffect(() => {

    fetchHomeData()

  }, [])


  const fetchHomeData = async () => {

    try {

      setLoading(true)

      setError('')


      const [
        popularResponse,
        trendingResponse,
        newReleasesResponse,
        upcomingResponse,
        topRatedResponse
      ] = await Promise.all([

        getPopularGamesAPI(),

        getTrendingGamesAPI(),

        getNewReleasesAPI(),

        getUpcomingGamesAPI(),

        getTopRatedGamesAPI()

      ])


      const popular =
        popularResponse.data.results || []

      const trending =
        trendingResponse.data.results || []

      const releases =
        newReleasesResponse.data.results || []

      const upcoming =
        upcomingResponse.data.results || []

      const topRated =
        topRatedResponse.data.results || []


      setPopularGames(popular)

      setTrendingGames(trending)

      setNewReleases(releases)

      setUpcomingGames(upcoming)

      setTopRatedGames(topRated)


      /*
        Use the first popular game
        as the featured hero.
      */

      if (popular.length > 0) {

        setFeaturedGame(popular[0])

      }


    } catch (error) {

      console.error(error)

      setError(
        'Unable to load GameVault content.'
      )

    } finally {

      setLoading(false)

    }

  }


  if (loading) {

    return (

      <div className="page-loading">

        Loading GameVault...

      </div>

    )

  }


  if (error) {

    return (

      <div className="page-error">

        {error}

        <button
          onClick={fetchHomeData}
        >
          Try Again
        </button>

      </div>

    )

  }


  return (

    <>

      {/* HERO */}

      <Hero game={featuredGame} />


      {/* POPULAR */}

      <GameSection
        label="POPULAR"
        title="Popular Games"
        games={popularGames}
      />


      {/* TRENDING */}

      <GameSection
        label="TRENDING"
        title="Trending Now"
        games={trendingGames}
      />


      {/* NEW RELEASES */}

      <GameSection
        label="JUST RELEASED"
        title="New Releases"
        games={newReleases}
      />


      {/* UPCOMING */}

      <GameSection
        label="COMING SOON"
        title="Upcoming Games"
        games={upcomingGames}
      />


      {/* TOP RATED */}

      <GameSection
        label="RATED BY PLAYERS"
        title="Top Rated"
        games={topRatedGames}
      />

    </>

  )
}


export default Home