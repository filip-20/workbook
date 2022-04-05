import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authSelectors } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import { getLoginUrl } from "./LoginPage";

function Navigation() {
  const accessToken = useAppSelector(authSelectors.accessToken);
  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand className="mx-3">Workbook</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="ms-auto me-3">
        <Nav.Link as={Link} to="/repos">Zoznam repozitárov</Nav.Link>
          {
            accessToken ?
              <Nav.Link as={Link} to="/logout">Odhlásiť sa</Nav.Link>
              : <Nav.Link href={getLoginUrl()}>Prihlásiť sa</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation