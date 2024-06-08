import { Link } from 'react-router-dom'

export function NavBar() {
    return (
        <nav>
            <div className='nav-links'>
                <div className='nav-block'><Link to='/home'>Home</Link></div>
                <div className='nav-block'><Link to='/curation'>Curation</Link></div>
                <div className='nav-block'><Link to='/profile'>Profile</Link></div>
            </div>
        </nav>
    )
}