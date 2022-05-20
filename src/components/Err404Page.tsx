import { Container } from "react-bootstrap";

export default function Err404Page() {
  return (
    <Container className="d-flex" style={{ height: 'calc(100vh - var(--workbook-nav-height))' }}>
      <div className="mx-auto mt-5 text-muted">
        <h1 className="display-1">404</h1>
        <p>Stránka sa nenašla</p>
      </div>
    </Container>
  );
}