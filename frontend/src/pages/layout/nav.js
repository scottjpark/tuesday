import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

export function NavBar() {
    const { user, loggedIn } = useSelector(state => state.auth)

    if (!loggedIn) return <Navigate to='/' />

    const username = user.username
    const email = user.email

    return (
        <nav id="navigation">


        </nav>
    )
}