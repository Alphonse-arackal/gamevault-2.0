import { createContext, useContext, useEffect, useState } from 'react'

import {
  getWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI
} from '../services/jsonServerAPI'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {

    try {

      const response = await getWishlistAPI()

      setWishlist(response.data || [])

    } catch (error) {

      console.error(
        'Failed to load wishlist:',
        error
      )

    } finally {

      setLoading(false)

    }

  }


  const isWishlisted = (gameId) => {

    return wishlist.some(
      item => String(item.rawgId) === String(gameId)
    )

  }


  const addToWishlist = async (game) => {

    try {

      const wishlistGame = {

        rawgId: game.id,

        name: game.name,

        background_image: game.background_image,

        rating: game.rating,

        released: game.released,

        genres: game.genres || [],

        platforms: game.platforms || []

      }

      const response =
        await addToWishlistAPI(wishlistGame)

      setWishlist(prev => [
        ...prev,
        response.data
      ])

    } catch (error) {

      console.error(
        'Failed to add to wishlist:',
        error
      )

    }

  }


  const removeFromWishlist = async (gameId) => {

    try {

      const item = wishlist.find(
        item =>
          String(item.rawgId) ===
          String(gameId)
      )

      if (!item) return

      await removeFromWishlistAPI(item.id)

      setWishlist(prev =>
        prev.filter(
          wishlistItem =>
            wishlistItem.id !== item.id
        )
      )

    } catch (error) {

      console.error(
        'Failed to remove from wishlist:',
        error
      )

    }

  }


  const toggleWishlist = async (game) => {

    if (isWishlisted(game.id)) {

      await removeFromWishlist(game.id)

    } else {

      await addToWishlist(game)

    }

  }


  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  )
}


export function useWishlist() {

  return useContext(WishlistContext)

}