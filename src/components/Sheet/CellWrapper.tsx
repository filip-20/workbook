import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import CellToolbar from './CellToolbar';

type CellWrapperProps = {
  key: number,
  cellId: number,
  children: JSX.Element,
};

function CellWrapper(props: CellWrapperProps) {
  const [addToolbarVisible, setAddToolbarVisible] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  
  console.log('CellWrapper function called')

  const [addToolbarHovered, setAddToolbarHovered] = useState(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  
  const toggleVisibility = (toolbarHovered: boolean, dropdownOpened: boolean) => {
    setAddToolbarHovered(toolbarHovered);
    setDropdownOpened(dropdownOpened);

    if (dropdownOpened || toolbarHovered) {
      setAddToolbarVisible(true);
    } else {
      setAddToolbarVisible(false);
    }
  }

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
        onMouseEnter={() => toggleVisibility(true, dropdownOpened)}
        onMouseLeave={() => toggleVisibility(false, dropdownOpened)}
        style={{ height: '12px', display: 'flex' }}
      >

        <CellToolbar
          onDropdownToggled={(isOpen) => { toggleVisibility(addToolbarHovered, isOpen); console.log('dropdownToggled: ' + isOpen)} }
          style={addToolbarVisible ? { display: 'block', marginTop: '-10px', marginLeft: 'auto', marginRight: 'auto' } : { display: 'none' }}
          cellId={props.cellId}
        />

      </Container>
    </>
  )
}

export default CellWrapper;