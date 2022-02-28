import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { selectAccessToken } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import config from '../config.json';

function Navigation() {
  const accessToken = useAppSelector(selectAccessToken);
  return (
    <Navbar className="ml-5" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Workbook</Navbar.Brand>
      </Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/zadania">Zadania</Nav.Link>
          <Nav.Link as={Link} to="/repos">Repozitár</Nav.Link>
          <Nav.Link as={Link} to="/sheet">Zošit</Nav.Link>
          {
            accessToken?
            <Nav.Link as={Link} to="/logout">Odhlásiť sa</Nav.Link>
            : <Nav.Link href={`https://github.com/login/oauth/authorize?client_id=${config.githubApi.clientId}&redirect_uri=${config.auth.backendUrl}`}>Prihlásiť sa</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation