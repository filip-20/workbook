import { Alert, Container } from "react-bootstrap";

export default function Err404Page() {
  return (
    <Alert variant="danger" className="m-3" style={{display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
      <Alert.Heading>404</Alert.Heading>
      Stránka sa nenašla
    </Alert>
  );
}