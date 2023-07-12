import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/layout/home'
import { NavBar } from './pages/layout/nav'
import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/signup'
import { LoggedIn } from './pages/auth/loggedIn'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loggedIn' element={<LoggedIn />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
