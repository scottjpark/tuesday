import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export function NavBar() {
    const { user } = useSelector(state => state.auth)
    const { avatarURL } = useSelector(state => state.user)

    const logout = () => {
        console.log('logging out')
    }

    return (
        <nav>
            <img className='profile-image' src={avatarURL} alt={user.username} />
            <div className='nav-links'>
                <Link to='/profile'>profile</Link>
                <div id='logout' onClick={logout}>log out</div>
            </div>
        </nav>
    )
}