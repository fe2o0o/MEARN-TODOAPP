/* eslint-disable react/prop-types */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink , useNavigate } from 'react-router-dom'
import './navbar.css'
import { useState } from 'react';
export default function Nav_bar(props) {

  const navigate = useNavigate()
  const [isUserLogin, setIsUserLogin] = useState(props.isLogin)


  const handleLogOut = () => {
    setIsUserLogin(false)
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Navbar.Brand >To Do App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">


            {!isUserLogin && <NavLink activeclassname='active' className='text-decoration-none text-dark p-2' to='/login'> Login  </NavLink>}


            {!isUserLogin && <NavLink activeclassname='active' className='text-decoration-none text-dark p-2' to='/signup'> SignUp  </NavLink>}
            {isUserLogin && <NavLink activeclassname='active' className='text-decoration-none text-dark p-2' to='/dashbord'> Dashbord  </NavLink>}
            {isUserLogin && <button onClick={handleLogOut} className="btn btn-danger"> LogOut  </button>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
