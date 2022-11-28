import { Spinner } from "react-bootstrap";

export interface LoadingProps {
  compact?: boolean,
}

export default function Loading(props: LoadingProps) {
  return (
    <Spinner animation="border" size={props.compact ? "sm" : undefined} role="status" />
  )
}