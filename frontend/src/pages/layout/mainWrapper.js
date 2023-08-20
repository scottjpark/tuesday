import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { NavBar } from './nav'
import { Profile } from '../account/profile'
import { Home } from '../home/home'

import CircularProgress from '@mui/material/CircularProgress'

export function MainWrapper() {
    const { loggedIn, loading } = useSelector(state => state.auth)
    if (!loggedIn && !loading) return <Navigate to='/private' />

    return (
        <>
            <div className='topbar'>
                <h1>raphire.net</h1>
            </div>
            <div className="main-wrapper">
                <NavBar />
                {loading ?
                    <CircularProgress /> :
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/profile' element={<Profile />} />
                        </Routes>
                    </main>
                }
            </div>
        </>
    )
}
