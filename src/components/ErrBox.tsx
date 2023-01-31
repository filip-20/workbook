import { Alert } from "react-bootstrap";

export interface ErrBoxProps {
  children: JSX.Element | string,
}

export default function ErrBox(props: ErrBoxProps) {
  return (
    <Alert variant="danger">{props.children}</Alert>
  )
}