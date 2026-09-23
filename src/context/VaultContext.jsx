import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  getVaultAPI,
  addToVaultAPI,
  updateVaultAPI,
  removeFromVaultAPI
} from '../services/jsonServerAPI'


const VaultContext = createContext()


export function VaultProvider({ children }) {

  const [vault, setVault] = useState([])
  const [loading, setLoading] = useState(true)


  // ============================
  // LOAD VAULT
  // ============================

  useEffect(() => {
    fetchVault()
  }, [])


  const fetchVault = async () => {

    try {

      const response = await getVaultAPI()

      setVault(response.data || [])

    } catch (error) {

      console.error(
        'Failed to load vault:',
        error
      )

    } finally {

      setLoading(false)

    }

  }


  // ============================
  // CHECK VAULT
  // ============================

  const isInVault = (gameId) => {

    return vault.some(
      item =>
        String(item.rawgId) ===
        String(gameId)
    )

  }


  // ============================
  // ADD TO VAULT
  // ============================

  const addToVault = async (game) => {

    try {

      // Prevent duplicates

      if (isInVault(game.id)) {
        return
      }


      const vaultGame = {

        rawgId: game.id,

        name: game.name,

        background_image:
          game.background_image,

        rating: game.rating,

        released: game.released,

        genres: game.genres || [],

        platforms: game.platforms || [],

        status: 'want-to-play'

      }


      const response =
        await addToVaultAPI(vaultGame)


      setVault(prev => [
        ...prev,
        response.data
      ])


    } catch (error) {

      console.error(
        'Failed to add game to vault:',
        error
      )

    }

  }


  // ============================
  // UPDATE STATUS
  // ============================

  const updateStatus = async (
    gameId,
    status
  ) => {

    try {

      const item = vault.find(
        item =>
          String(item.rawgId) ===
          String(gameId)
      )


      if (!item) {
        return
      }


      const response =
        await updateVaultAPI(
          item.id,
          { status }
        )


      setVault(prev =>
        prev.map(
          vaultItem =>
            vaultItem.id === item.id
              ? response.data
              : vaultItem
        )
      )


    } catch (error) {

      console.error(
        'Failed to update vault status:',
        error
      )

    }

  }


  // ============================
  // REMOVE
  // ============================

  const removeFromVault = async (
    gameId
  ) => {

    try {

      const item = vault.find(
        item =>
          String(item.rawgId) ===
          String(gameId)
      )


      if (!item) {
        return
      }


      await removeFromVaultAPI(
        item.id
      )


      setVault(prev =>
        prev.filter(
          vaultItem =>
            vaultItem.id !== item.id
        )
      )


    } catch (error) {

      console.error(
        'Failed to remove game from vault:',
        error
      )

    }

  }


  return (

    <VaultContext.Provider
      value={{
        vault,
        loading,
        isInVault,
        addToVault,
        updateStatus,
        removeFromVault
      }}
    >

      {children}

    </VaultContext.Provider>

  )

}


export function useVault() {

  return useContext(VaultContext)

}