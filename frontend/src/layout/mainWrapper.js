import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { TopBar } from './components/top'
import { NavBar } from './components/nav'
import { Home } from './components/home'
import { Profile } from '../features/users/components/profile'
import { Curate } from '../features/curation/curate'

import CircularProgress from '@mui/material/CircularProgress'

export function MainWrapper() {
    const { loggedIn, loading } = useSelector(state => state.auth)
    if (!loggedIn && !loading) return <Navigate to='/private' />

    return (
        <>
            <TopBar />
            <NavBar />
            <div className="main-wrapper">
                {loading ?
                    <>
                        <div className="whitespace20" />
                        <CircularProgress />
                    </> :
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/curation' element={<Curate />} />
                        </Routes>
                    </main>
                }
            </div>
        </>
    )
}
