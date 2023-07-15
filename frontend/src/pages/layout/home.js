import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function Home() {
    const { loggedIn, loading } = useSelector(state => state.user)
    if (loggedIn && !loading) return <Navigate to='/loggedIn' />
    return (
        <div>
            <h1>This is the default Home page</h1>
        </div>
    )
}