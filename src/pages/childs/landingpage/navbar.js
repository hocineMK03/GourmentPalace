import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../../../styles/navbar.css';
import Cookies from 'js-cookie';
import authservice from '../../../services/authservice';

const NavbarFunc = ({isAuth,setIsAuth}) => {
  const setUpLogOut=()=>{
    const sessiontoken = Cookies.get('sessiontoken')
    authservice.logOutRequest(sessiontoken)
    Cookies.remove('sessiontoken');
    Cookies.remove('username');
setIsAuth(false)
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#" className="logo">
       GourmetPalate
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        
        {isAuth? (
          <Nav className="mx-auto">
           <Nav.Link href="#">Explore</Nav.Link>
           <Nav.Link href="#">About</Nav.Link>
           <Nav.Link href="#">Services</Nav.Link>
           </Nav>
        ) : (
          <Nav className="mx-auto">
          <Nav.Link href="/explore">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Services</Nav.Link>
          </Nav>
        )}
         
         {isAuth? (
          <Nav>
          <Nav.Link href="#" className="login-link" onClick={setUpLogOut}>
            logout
          </Nav.Link>
        </Nav>
        ) : (
          <Nav>
          <Nav.Link href="/login" className="login-link">
            Login
          </Nav.Link>
        </Nav>
        )}
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarFunc;
