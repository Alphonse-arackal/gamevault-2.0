import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import {
  FiSearch,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiArchive
} from 'react-icons/fi'

import '../styles/navbar.css'


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)


  const closeMenu = () => {
    setMenuOpen(false)
  }


  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* ============================
            LOGO
        ============================ */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span>GAME</span>VAULT
        </Link>


        {/* ============================
            DESKTOP NAVIGATION
        ============================ */}

        <nav className="desktop-nav">

          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/games">
            Games
          </NavLink>

          <NavLink to="/genres">
            Genres
          </NavLink>

          <NavLink to="/top-rated">
            Top Rated
          </NavLink>

          <NavLink to="/upcoming">
            Upcoming
          </NavLink>

          {/* <NavLink to="/news">
            News
          </NavLink> */}
        </nav>


        {/* ============================
            RIGHT ACTIONS
        ============================ */}

        <div className="navbar-actions">


          {/* SEARCH */}

          <Link
            to="/games"
            className="nav-icon"
            aria-label="Search games"
          >
            <FiSearch />
          </Link>


          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="nav-icon"
            aria-label="Wishlist"
          >
            <FiHeart />
          </Link>


          {/* MY VAULT */}

          <NavLink
            to="/vault"
            className="nav-icon"
            aria-label="My Vault"
          >
            <FiArchive />
          </NavLink>


          {/* PROFILE */}

          <Link
            to="/profile"
            className="nav-icon profile-icon"
            aria-label="Profile"
          >
            <FiUser />
          </Link>

        </div>


        {/* ============================
            MOBILE MENU BUTTON
        ============================ */}

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
        >

          {menuOpen
            ? <FiX />
            : <FiMenu />}

        </button>

      </div>


      {/* ============================
          MOBILE NAVIGATION
      ============================ */}

      <div
        className={`mobile-nav ${
          menuOpen
            ? 'mobile-nav-open'
            : ''
        }`}
      >

        <NavLink
          to="/"
          end
          onClick={closeMenu}
        >
          Home
        </NavLink>


        <NavLink
          to="/games"
          onClick={closeMenu}
        >
          Games
        </NavLink>


        <NavLink
          to="/genres"
          onClick={closeMenu}
        >
          Genres
        </NavLink>


        <NavLink
          to="/top-rated"
          onClick={closeMenu}
        >
          Top Rated
        </NavLink>


        <NavLink
          to="/upcoming"
          onClick={closeMenu}
        >
          Upcoming
        </NavLink>


        <NavLink
          to="/news"
          onClick={closeMenu}
        >
          News
        </NavLink>


        <NavLink
          to="/wishlist"
          onClick={closeMenu}
        >
          Wishlist
        </NavLink>


        <NavLink
          to="/vault"
          onClick={closeMenu}
        >
          My Vault
        </NavLink>

      </div>

    </header>

  )
}


export default Navbar