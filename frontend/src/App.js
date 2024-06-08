import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { verify } from './features/users/actions/authActions'
import { Login } from './features/users/components/login'
import { SignUp } from './features/users/components/signup'
import { Private } from './layout/components/private'
import { MainWrapper } from './layout/mainWrapper'

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
          <>
            <div className="whitespace50" />
            <CircularProgress />
          </> :
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
