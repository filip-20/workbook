import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
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
          <Nav.Link as={Link} to="/sheet">Zošit</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation