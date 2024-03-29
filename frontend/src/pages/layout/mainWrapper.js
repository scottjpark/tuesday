import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { TopBar } from './top'
import { NavBar } from './nav'
import { Profile } from '../account/profile'
import { Home } from '../home/home'
import { Curate } from '../curation/curate'

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
