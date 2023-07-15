import React, { useState } from 'react'
import { register } from '../../features/auth/authActions';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

export function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const { loggedIn, loading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            email: email
        }
        dispatch(register(user))
    }

    if (loggedIn && !loading) return <Navigate to='/loggedIn' />
    return (
        <form id='auth'>
            <label>Username</label>
            <input
                className='auth-input'
                placeholder='Username'
                name='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
                className='auth-input'
                placeholder='Password'
                name='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <label>Password</label>
            <input
                className='auth-input'
                placeholder='email'
                name='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            {loading ?
                <CircularProgress /> :
                <button type='submit' onClick={handleSubmit}>Submit</button>
            }
        </form>
    )
}