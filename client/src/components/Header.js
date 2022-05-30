import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../utils/auth";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Link to="/">
          <img
            className="logo-sm"
            src="/assets/images/logo-light.png"
            alt="Smart-Cube Logo"
          />
        </Link>
        <Navbar.Brand as={Link} to="/">
          SMART CUBE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto">
            {/* if user is logged in show saved books and logout */}
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Your Device
                </Nav.Link>
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/"></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
