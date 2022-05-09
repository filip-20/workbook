import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authSelectors } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import { getLoginUrl } from "./LoginPage";
import { PopoverNavLink } from "./PopoverMenu";

import config from '../config.json';

function Navigation() {
  const accessToken = useAppSelector(authSelectors.accessToken);
  const user = useAppSelector(authSelectors.user);
  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href={config.frontend.basePath} className="ms-3">Workbook</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/repos">Zoznam repozitárov</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="me-3">
        {
          accessToken ?
            (
              <PopoverNavLink title={<><Image roundedCircle src={user?.avatarUrl} className="me-2" style={{ height: '1.5rem' }} />{user?.login}</>}>
                <Nav.Link as={Link} to="/logout">Odhlásiť sa</Nav.Link>
              </PopoverNavLink>
            )
            : <Nav.Link href={getLoginUrl()}>Prihlásiť sa</Nav.Link>
        }
      </Nav>
    </Navbar>
  )
}

export default Navigation