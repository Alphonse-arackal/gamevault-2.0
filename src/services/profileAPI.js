import axios from 'axios'

const profileAPI = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_URL
})

// ============================
// GET PROFILE
// ============================

export const getProfileAPI = () => {
  return profileAPI.get('/profile')
}

// ============================
// CREATE PROFILE
// ============================

export const createProfileAPI = (profileData) => {
  return profileAPI.post('/profile', profileData)
}

// ============================
// UPDATE PROFILE
// ============================

export const updateProfileAPI = (id, profileData) => {
  return profileAPI.patch(
    `/profile/${id}`,
    profileData
  )
}