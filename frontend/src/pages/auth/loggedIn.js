import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

export function LoggedIn() {

    const { loggedIn } = useSelector(state => state.user)

    if (!loggedIn) return <Navigate to='/' />
    return (
        <div>You're logged in</div>
    )
}