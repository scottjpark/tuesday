import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/users/actions/authActions'

export function TopBar() {
    const { user } = useSelector(state => state.auth)
    const { avatarURL } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='topbar'>
            <h1>raphire.net</h1>
            <div className='user-display'>
                <img className='profile-image' src={avatarURL} alt={user.username} />
                <div id='logout-link' onClick={handleLogout}>log out</div>
            </div>
        </div>
    )
}