import axios from 'axios'

const jsonServerAPI = axios.create({
  baseURL: 'http://localhost:3001'
})


// ============================
// WISHLIST
// ============================

export const getWishlistAPI = () => {
  return jsonServerAPI.get('/wishlist')
}

export const addToWishlistAPI = (game) => {
  return jsonServerAPI.post('/wishlist', game)
}

export const removeFromWishlistAPI = (id) => {
  return jsonServerAPI.delete(`/wishlist/${id}`)
}



// ============================
// VAULT
// ============================

export const getVaultAPI = () => {
  return jsonServerAPI.get('/vault')
}

export const addToVaultAPI = (game) => {
  return jsonServerAPI.post('/vault', game)
}

export const updateVaultAPI = (id, data) => {
  return jsonServerAPI.patch(`/vault/${id}`, data)
}

export const removeFromVaultAPI = (id) => {
  return jsonServerAPI.delete(`/vault/${id}`)
}