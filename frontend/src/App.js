import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { verify } from './features/auth/authActions'

import { Home } from './pages/layout/home'
import { NavBar } from './pages/layout/nav'
import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/signup'
import { LoggedIn } from './pages/auth/loggedIn'

import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const { loading } = useSelector(state => state.user)
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
            <Route path='/' element={<Home />} />
            <Route path='/loggedIn' element={<LoggedIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
