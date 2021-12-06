import React from 'react';
import { Container } from "react-bootstrap";

export interface AppCellProps {
  type?: string
}

function AppCell(props: AppCellProps) {
  return (
    <Container>App cell of type: '{props.type}'</Container>
  )
}

export default AppCell;