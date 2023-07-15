import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

export function LoggedIn() {
    const { user, loggedIn } = useSelector(state => state.user)

    if (!loggedIn) return <Navigate to='/' />

    const username = user.username
    const email = user.email

    return (
        <>
            You're logged In
            <p>Username: {username}</p>
            <p>Email: {email}</p>
        </>
    )
}