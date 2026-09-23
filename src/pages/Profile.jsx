import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import {
FiHeart,
FiArchive,
FiPlay,
FiCheck,
FiClock,
FiX,
FiEdit2,
FiSave,
FiCamera,
FiTrash2
} from 'react-icons/fi'

import { useWishlist } from '../context/WishlistContext'
import { useVault } from '../context/VaultContext'
import { useProfile } from '../context/ProfileContext'

import '../styles/profile.css'


function Profile() {

  // ============================
  // WISHLIST
  // ============================

  const {
    wishlist,
    loading: wishlistLoading
  } = useWishlist()


  // ============================
  // VAULT
  // ============================

  const {
    vault,
    loading: vaultLoading
  } = useVault()


  // ============================
  // PROFILE
  // ============================

  const {
    profile,
    loading: profileLoading,
    saveProfile
  } = useProfile()


  // ============================
  // PROFILE DATA
  // ============================

  const gamingName =
    profile.gamingName ||
    'GameVault Player'

  const bio =
    profile.bio ||
    'Exploring games, building my collection.'


    // ============================
// PROFILE PICTURE
// ============================

const [profileImage, setProfileImage] =
  useState(
    () =>
      localStorage.getItem(
        'gamevaultProfileImage'
      ) || ''
  )

const [editProfileImage, setEditProfileImage] =
  useState(profileImage)

const fileInputRef = useRef(null)


  // ============================
  // EDIT STATE
  // ============================

  const [editMode, setEditMode] =
    useState(false)

  const [editName, setEditName] =
    useState('')

  const [editBio, setEditBio] =
    useState('')


  // ============================
  // LOADING
  // ============================

  const loading =
    wishlistLoading ||
    vaultLoading ||
    profileLoading


  // ============================
  // VAULT STATISTICS
  // ============================

  const wantToPlayCount =
    vault.filter(
      game =>
        game.status === 'want-to-play'
    ).length


  const playingCount =
    vault.filter(
      game =>
        game.status === 'playing'
    ).length


  const completedCount =
    vault.filter(
      game =>
        game.status === 'completed'
    ).length


  const droppedCount =
    vault.filter(
      game =>
        game.status === 'dropped'
    ).length


  const completionPercentage =
    vault.length > 0
      ? Math.round(
          (completedCount /
            vault.length) *
            100
        )
      : 0


  const recentGames =
    [...vault]
      .reverse()
      .slice(0, 4)


  // ============================
  // OPEN EDIT PROFILE
  // ============================

const openEditProfile = () => {

  setEditName(gamingName)

  setEditBio(bio)

  setEditProfileImage(profileImage)

  setEditMode(true)

}


  // ============================
  // CANCEL EDIT
  // ============================

const cancelEdit = () => {

  setEditName(gamingName)

  setEditBio(bio)

  setEditProfileImage(profileImage)

  setEditMode(false)

}


// ============================
// PROFILE IMAGE UPLOAD
// ============================

const handleProfileImageChange = (event) => {

  const file = event.target.files?.[0]

  if (!file) {
    return
  }


  // Check file type
  if (!file.type.startsWith('image/')) {

    alert('Please select an image file.')

    event.target.value = ''

    return
  }


  // Check file size - 1.5 MB
  const maxSize =
    1.5 * 1024 * 1024

  if (file.size > maxSize) {

    alert(
      'Image is too large. Please choose an image smaller than 1.5 MB.'
    )

    event.target.value = ''

    return
  }


  const reader =
    new FileReader()


  reader.onload = () => {

    setEditProfileImage(
      reader.result
    )

  }


  reader.onerror = () => {

    alert(
      'Failed to read the image.'
    )

  }


  reader.readAsDataURL(file)

  event.target.value = ''

}

const handleRemoveProfileImage = () => {

  setEditProfileImage('')

}


  // ============================
  // SAVE PROFILE
  // ============================

  const handleSaveProfile = async () => {

  const finalName =
    editName.trim() ||
    'GameVault Player'

  const finalBio =
    editBio.trim() ||
    'Exploring games, building my collection.'

  try {

    // Save gaming name and bio to JSON Server
    await saveProfile({
      gamingName: finalName,
      bio: finalBio
    })

    // Save profile picture to browser storage
    if (editProfileImage) {

      localStorage.setItem(
        'gamevaultProfileImage',
        editProfileImage
      )

    } else {

      localStorage.removeItem(
        'gamevaultProfileImage'
      )

    }

    // Update the profile image immediately
    setProfileImage(editProfileImage)

    // Close editor
    setEditMode(false)

  } catch (error) {

    console.error(
      'Could not save profile:',
      error
    )

  }

}

  // ============================
  // LOADING SCREEN
  // ============================

  if (loading) {

    return (

      <div className="profile-page">

        <div className="profile-container">

          <div className="profile-loading">

            <div className="profile-loading-header"></div>

            <div className="profile-loading-stats">

              {Array.from({
                length: 4
              }).map((_, index) => (

                <div
                  key={index}
                  className="profile-loading-stat"
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    )

  }


  // ============================
  // PROFILE PAGE
  // ============================

  return (

    <div className="profile-page">

      <div className="profile-container">


        {/* ============================
            PROFILE HERO
        ============================ */}

        <section className="profile-hero">


          {/* AVATAR */}

<div className="profile-avatar">

  {profileImage ? (

    <img
      src={profileImage}
      alt={`${gamingName} profile`}
    />

  ) : (

    <span>

      {gamingName
        .slice(0, 2)
        .toUpperCase()}

    </span>

  )}

</div>


          {/* PROFILE INFO */}

          <div className="profile-hero-content">

            <span className="profile-label">
              GAMEVAULT
            </span>


            <h1>
              {gamingName}
            </h1>


            <p>
              {bio}
            </p>

          </div>


          {/* EDIT BUTTON */}

          {!editMode && (

            <button
              className="profile-edit-button"
              onClick={openEditProfile}
            >

              <FiEdit2 />

              Edit Profile

            </button>

          )}

        </section>


        {/* ============================
            EDIT PROFILE PANEL
        ============================ */}

        {editMode && (

          <section className="profile-edit-panel">

            <div className="profile-edit-heading">

              <div>

                <span>
                  PROFILE SETTINGS
                </span>

                <h2>
                  Edit Profile
                </h2>

              </div>

            </div>

            {/* ============================
    PROFILE PICTURE
============================ */}

<div className="profile-picture-editor">

  <div className="profile-picture-preview">

    {editProfileImage ? (

      <img
        src={editProfileImage}
        alt="Profile preview"
      />

    ) : (

      <span>

        {editName
          ? editName
              .slice(0, 2)
              .toUpperCase()
          : 'GV'}

      </span>

    )}

  </div>


  <div className="profile-picture-actions">

    <div>

      <span className="profile-picture-label">
        PROFILE PICTURE
      </span>

      <p>
        Upload a gaming avatar for your profile.
      </p>

    </div>


    <div className="profile-picture-buttons">

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleProfileImageChange}
        className="profile-image-input"
      />


      <button
        type="button"
        className="profile-upload-button"
        onClick={() =>
          fileInputRef.current?.click()
        }
      >

        <FiCamera />

        {editProfileImage
          ? 'Change Picture'
          : 'Upload Picture'}

      </button>


      {editProfileImage && (

        <button
          type="button"
          className="profile-remove-button"
          onClick={
            handleRemoveProfileImage
          }
        >

          <FiTrash2 />

          Remove

        </button>

      )}

    </div>

  </div>

</div>


            {/* GAMING NAME */}

            <div className="profile-field">

              <label>
                Gaming Name
              </label>

              <input
                type="text"
                value={editName}
                maxLength={30}
                placeholder="Enter your gaming name"
                onChange={(event) =>
                  setEditName(
                    event.target.value
                  )
                }
              />

              <small>
                {editName.length}/30
              </small>

            </div>


            {/* BIO */}

            <div className="profile-field">

              <label>
                Bio
              </label>

              <textarea
                value={editBio}
                maxLength={120}
                placeholder="Tell something about your gaming style..."
                rows="4"
                onChange={(event) =>
                  setEditBio(
                    event.target.value
                  )
                }
              />

              <small>
                {editBio.length}/120
              </small>

            </div>


            {/* ACTION BUTTONS */}

            <div className="profile-edit-actions">

              <button
                className="profile-save-button"
                onClick={handleSaveProfile}
              >

                <FiSave />

                Save Profile

              </button>


              <button
                className="profile-cancel-button"
                onClick={cancelEdit}
              >

                <FiX />

                Cancel

              </button>

            </div>

          </section>

        )}


        {/* ============================
            MAIN STATS
        ============================ */}

        <section className="profile-stats">

          <Link
            to="/vault"
            className="profile-stat"
          >

            <div className="profile-stat-icon">
              <FiArchive />
            </div>

            <div>

              <strong>
                {vault.length}
              </strong>

              <span>
                VAULT
              </span>

            </div>

          </Link>


          <Link
            to="/wishlist"
            className="profile-stat"
          >

            <div className="profile-stat-icon">
              <FiHeart />
            </div>

            <div>

              <strong>
                {wishlist.length}
              </strong>

              <span>
                WISHLIST
              </span>

            </div>

          </Link>


          <div className="profile-stat">

            <div className="profile-stat-icon">
              <FiPlay />
            </div>

            <div>

              <strong>
                {playingCount}
              </strong>

              <span>
                PLAYING
              </span>

            </div>

          </div>


          <div className="profile-stat">

            <div className="profile-stat-icon">
              <FiCheck />
            </div>

            <div>

              <strong>
                {completedCount}
              </strong>

              <span>
                COMPLETED
              </span>

            </div>

          </div>

        </section>


        {/* ============================
            LIBRARY BREAKDOWN
        ============================ */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                YOUR LIBRARY
              </span>

              <h2>
                Gaming Statistics
              </h2>

            </div>

          </div>


          <div className="profile-breakdown">


            <div className="profile-breakdown-item">

              <div className="breakdown-icon">
                <FiClock />
              </div>

              <div className="breakdown-info">

                <span>
                  Want to Play
                </span>

                <strong>
                  {wantToPlayCount}
                </strong>

              </div>

            </div>


            <div className="profile-breakdown-item">

              <div className="breakdown-icon">
                <FiPlay />
              </div>

              <div className="breakdown-info">

                <span>
                  Playing
                </span>

                <strong>
                  {playingCount}
                </strong>

              </div>

            </div>


            <div className="profile-breakdown-item">

              <div className="breakdown-icon">
                <FiCheck />
              </div>

              <div className="breakdown-info">

                <span>
                  Completed
                </span>

                <strong>
                  {completedCount}
                </strong>

              </div>

            </div>


            <div className="profile-breakdown-item">

              <div className="breakdown-icon">
                <FiX />
              </div>

              <div className="breakdown-info">

                <span>
                  Dropped
                </span>

                <strong>
                  {droppedCount}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ============================
            COMPLETION
        ============================ */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                PROGRESS
              </span>

              <h2>
                Completion
              </h2>

            </div>


            <strong className="profile-percentage">
              {completionPercentage}%
            </strong>

          </div>


          <div className="profile-progress">

            <div
              className="profile-progress-bar"
              style={{
                width:
                  `${completionPercentage}%`
              }}
            />

          </div>


          <p className="profile-progress-text">

            {completedCount}
            {' '}
            of
            {' '}
            {vault.length}
            {' '}
            games completed.

          </p>

        </section>


        {/* ============================
            RECENT GAMES
        ============================ */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                GAMEVAULT
              </span>

              <h2>
                Recently Added
              </h2>

            </div>


            {vault.length > 0 && (

              <Link
                to="/vault"
                className="profile-view-all"
              >
                View Vault →
              </Link>

            )}

          </div>


          {recentGames.length === 0 ? (

            <div className="profile-empty">

              <FiArchive />

              <h3>
                Your vault is empty
              </h3>

              <p>
                Add games to your vault to
                start building your collection.
              </p>

              <Link
                to="/games"
                className="profile-browse"
              >
                Explore Games
              </Link>

            </div>

          ) : (

            <div className="profile-recent-grid">

              {recentGames.map(game => (

                <Link
                  key={game.id}
                  to={`/game/${game.rawgId}`}
                  className="profile-game"
                >

                  <div className="profile-game-image">

                    <img
                      src={
                        game.background_image
                      }
                      alt={game.name}
                    />

                  </div>


                  <div className="profile-game-info">

                    <h3>
                      {game.name}
                    </h3>

                    <span>

                      {game.status ===
                      'want-to-play'
                        ? 'Want to Play'
                        : game.status
                          ? game.status
                          : 'Want to Play'}

                    </span>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </section>

      </div>

    </div>

  )

}


export default Profile