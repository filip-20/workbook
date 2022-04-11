import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authSelectors } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import { getLoginUrl } from "./LoginPage";

function Navigation() {
  const accessToken = useAppSelector(authSelectors.accessToken);
  const user = useAppSelector(authSelectors.user);
  return (
    <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand className="ms-3">Workbook</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto" style={{marginRight: '4.5rem'}}>
            <Nav.Link as={Link} to="/repos">Zoznam repozitárov</Nav.Link>
            {
              accessToken ?
                (
                  <NavDropdown menuVariant="dark" title={<><Image roundedCircle src={user?.avatarUrl} className="me-2" style={{ height: '1.5rem' }} />{user?.login}</>}>
                    <NavDropdown.Item ><Nav.Link as={Link} to="/logout">Odhlásiť sa</Nav.Link></NavDropdown.Item>
                  </NavDropdown>
                )
                : <Nav.Link href={getLoginUrl()}>Prihlásiť sa</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation