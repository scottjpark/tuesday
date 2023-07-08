import React, { useState } from 'react'

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        }
        console.log(user)
    }

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
                value={username}
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
    )
}