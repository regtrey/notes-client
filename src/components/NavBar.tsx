import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../models/users';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';
import { Link } from 'react-router-dom';

type NavBarProps = {
  loggedInUser: User | null;
  onSignupClicked: () => void;
  onLoggedinClicked: () => void;
  onLogoutSuccessful: () => void;
};

function NavBar({
  loggedInUser,
  onSignupClicked,
  onLoggedinClicked,
  onLogoutSuccessful,
}: NavBarProps) {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cool Notes App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onSignupClicked={onSignupClicked}
                onLoginClicked={onLoggedinClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
