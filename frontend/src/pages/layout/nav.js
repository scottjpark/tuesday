import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../../features/auth/authActions'

export function NavBar() {
    const { user } = useSelector(state => state.auth)
    const { avatarURL } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav>
            <img className='profile-image' src={avatarURL} alt={user.username} />
            <div className='nav-links'>
                <Link to='/profile'>profile</Link>
                <div id='logout' onClick={handleLogout}>log out</div>
            </div>
        </nav>
    )
}