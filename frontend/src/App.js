import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { verify } from './features/auth/authActions'

import { Private } from './pages/layout/private'
import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/signup'
import { Profile } from './pages/auth/profile'

import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // eslint-disable-next-line
  useEffect(() => { dispatch(verify()) }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar /> */}
        {loading ?
          <CircularProgress /> :
          <Routes>
            <Route path='/' element={<Private />} />
            <Route path='/loggedIn' element={<Profile />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
