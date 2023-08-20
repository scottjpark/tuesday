import React, { useState } from 'react'
import { register } from '../../features/auth/authActions';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

export function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const { loggedIn, loading } = useSelector(state => state.auth)
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
        <div id='out-main'>
            <form id='auth'>
                <h1>Register</h1>
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
                <div className='auth-fields'>
                    <label>Email</label>
                    <input
                        className='auth-input'
                        placeholder='email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                {loading ?
                    <CircularProgress /> :
                    <button type='submit' onClick={handleSubmit}>Register</button>
                }
                <p className='auth-notes'>Already a member? <Link to='/login'>Log in</Link></p>
            </form>
        </div>
    )
}