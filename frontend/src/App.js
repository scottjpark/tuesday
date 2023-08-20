import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { verify } from './features/auth/authActions'

import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/signup'
import { Private } from './pages/layout/private'
import { MainWrapper } from './pages/layout/mainWrapper'

import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // eslint-disable-next-line
  useEffect(() => { dispatch(verify()) }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {loading ?
          <CircularProgress /> :
          <Routes>
            <Route path='/*' element={<MainWrapper />} />
            <Route path='/private' element={<Private />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
