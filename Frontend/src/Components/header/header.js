import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
const Header = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          navigate('/');
          logout()
        } 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Car shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {isAuthenticated ? (
            <Nav.Link as={Link} to="/" onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};



export default Header;