import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  getProfileAPI,
  createProfileAPI,
  updateProfileAPI
} from '../services/profileAPI'


const ProfileContext = createContext(null)


export function ProfileProvider({ children }) {

  const [profile, setProfile] = useState({
    id: null,
    gamingName: 'GameVault Player',
    bio: 'Exploring games, building my collection.'
  })

  const [loading, setLoading] = useState(true)


  // ============================
  // GET PROFILE
  // ============================

  const fetchProfile = async () => {

    try {

      const response = await getProfileAPI()

      console.log(
        'Profile from JSON Server:',
        response.data
      )

      if (response.data.length > 0) {

        setProfile(response.data[0])

      }

    } catch (error) {

      console.error(
        'Error fetching profile:',
        error
      )

    } finally {

      setLoading(false)

    }

  }


  // ============================
  // SAVE PROFILE
  // ============================

  const saveProfile = async (profileData) => {

    try {

      console.log(
        'Saving profile:',
        profileData
      )

      let response

      if (profile.id) {

        console.log(
          'Updating profile:',
          profile.id
        )

        response = await updateProfileAPI(
          profile.id,
          profileData
        )

      } else {

        console.log(
          'Creating new profile'
        )

        response = await createProfileAPI(
          profileData
        )

      }

      console.log(
        'Profile saved:',
        response.data
      )

      setProfile(response.data)

      return response.data

    } catch (error) {

      console.error(
        'SAVE PROFILE ERROR:',
        error
      )

      throw error

    }

  }


  // ============================
  // LOAD PROFILE
  // ============================

  useEffect(() => {

    fetchProfile()

  }, [])


  return (

    <ProfileContext.Provider
      value={{
        profile,
        loading,
        saveProfile,
        fetchProfile
      }}
    >

      {children}

    </ProfileContext.Provider>

  )

}


export function useProfile() {

  const context = useContext(ProfileContext)

  if (!context) {

    throw new Error(
      'useProfile must be used inside ProfileProvider'
    )

  }

  return context

}