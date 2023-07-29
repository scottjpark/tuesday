import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'

export function Private() {
    const { loggedIn, loading } = useSelector(state => state.auth)
    if (loggedIn && !loading) return <Navigate to='/loggedIn' />

    return (
        <div id='private-message'>
            <p>This is a private service. You must be a member to access this page.</p>
            <p>If you're a member, <Link to='/login'>log In</Link></p>
        </div>
    )
}