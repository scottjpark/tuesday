import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { uploadAvatar } from '../../features/user/userActions'

export function Profile() {
    const { user, loggedIn } = useSelector(state => state.auth)
    const { avatarURL } = useSelector(state => state.user)
    const [selectedImage, setSelectedImage] = useState(null)

    console.log(avatarURL)

    let username = ''
    let email = ''
    if (loggedIn && user) {
        username = user.username
        email = user.email
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0])
    }

    const dispatch = useDispatch()
    const handleImageSubmit = (e) => {
        e.preventDefault()
        dispatch(uploadAvatar(selectedImage))
    }

    if (!loggedIn) return <Navigate to='/' />
    return (
        <>
            <img src={avatarURL} alt="" />
            You're logged In
            <p>Username: {username}</p>
            <p>Email: {email}</p>

            <form>
                Upload
                <input type="file" id="profile-image" accept="image/png, image/jpeg" onChange={handleImageChange} required />
                <button onClick={handleImageSubmit}>Upload Image</button>
            </form>
        </>
    )
}