import './App.css'
import Home from './pages/Home/home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'



function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Navigate to='/login' replace />} />
          <Route path='/dashbord' exact element={<Home/>} />
          <Route path='/signup' exact element={<SignUp/>} />
          <Route path='/login' exact element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
