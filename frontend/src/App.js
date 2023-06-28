import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/layout/home'
import { NavBar } from './pages/layout/nav'
import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/signup'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
