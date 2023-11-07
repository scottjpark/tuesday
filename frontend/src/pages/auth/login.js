import React, { useState } from 'react'
import { login } from '../../features/auth/authActions';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loggedIn, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        }
        dispatch(login(user))
    }


    if (loggedIn && !loading) return <Navigate to='/' />
    return (
        <div id='out-main'>
            <form id='auth'>
                <h1>Log In</h1>
                <div className='auth-fields'>
                    <label>Username</label>
                    <input
                        className='auth-input'
                        placeholder='Username'
                        name='username'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='auth-fields'>
                    <label>Password</label>
                    <input
                        className='auth-input'
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {loading ?
                    <CircularProgress /> :
                    <button type='submit' onClick={handleSubmit}>Log In</button>
                }
            </form>
        </div>
    )
}