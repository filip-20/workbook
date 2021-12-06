import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import CellToolbar from './CellToolbar';

type CellWrapperProps = {
  key: number,
  cellId: number,
  children: JSX.Element,
};

function CellWrapper(props: CellWrapperProps) {
  const [addToolbarHovered, setAddToolbarHovered] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  return (
    <>
      <Container
        onMouseEnter={() => setCellHovered(true)}
        onMouseLeave={() => setCellHovered(false)}
        className={cellHovered ? 'shadow-sm' : ''}
        style={{marginBottom: '0'}}
      >
        {props.children}
      </Container>
      <Container
        onMouseEnter={() => setAddToolbarHovered(true)}
        onMouseLeave={() => setAddToolbarHovered(false)}
        style={{ height: '12px', display: 'flex' }}
      >

        <CellToolbar onMouseEnter={() => console.log('celltoolbar mouseenter')} onMouseLeave={() => console.log('celltoolbar mouseleave')}
          style={addToolbarHovered ? { display: 'block', marginTop: '-10px', marginLeft: 'auto', marginRight: 'auto' } : { display: 'none' }}
          cellId={props.cellId}
        />

      </Container>
    </>
  )
}

export default CellWrapper;