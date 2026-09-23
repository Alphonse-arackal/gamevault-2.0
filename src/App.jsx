import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Games from './pages/Games'
import Genres from './pages/Genres'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import News from './pages/News'
import GameDetails from './pages/GameDetails'
import Wishlist from './pages/Wishlist'
import Vault from './pages/Vault'
import Profile from './pages/Profile'

import { WishlistProvider } from './context/WishlistContext'
import { VaultProvider } from './context/VaultContext'
import { ProfileProvider } from './context/ProfileContext'


function App() {

  return (

    <BrowserRouter>

      <WishlistProvider>

        <VaultProvider>

          <ProfileProvider>

            <Navbar />

            <main>

              <Routes>

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/games"
                  element={<Games />}
                />

                <Route
                  path="/genres"
                  element={<Genres />}
                />

                <Route
                  path="/top-rated"
                  element={<TopRated />}
                />

                <Route
                  path="/upcoming"
                  element={<Upcoming />}
                />

                <Route
                  path="/news"
                  element={<News />}
                />

                <Route
                  path="/game/:id"
                  element={<GameDetails />}
                />

                <Route
                  path="/wishlist"
                  element={<Wishlist />}
                />

                <Route
                  path="/vault"
                  element={<Vault />}
                />

                <Route
                  path="/profile"
                  element={<Profile />}
                />

              </Routes>

            </main>

          </ProfileProvider>

        </VaultProvider>

      </WishlistProvider>

    </BrowserRouter>

  )

}


export default App