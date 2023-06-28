import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NavBar() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <div>
            {isAuth ? 'Logout' : <Link to='/login'>Login</Link>}
        </div>
    )
}