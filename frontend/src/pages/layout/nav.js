import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../../features/auth/authActions';

export function NavBar() {

    const isAuth = useSelector(state => state.user.loggedIn)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(logout())
    }

    return (
        <div>
            {isAuth ? (<button onClick={handleClick}>Logout</button>) : (<div><Link to='/signup'>Register</Link> <Link to='/login'>Login</Link></div>)}
        </div>
    )
}