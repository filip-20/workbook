import { Alert, Container, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CellWrapper from "./CellWrapper";
import AddToolbar from "./AddToolbar";
import { sheetActions, sheetSelectors } from "../../store/sheetSlice";

function Sheet() {
  const dispatch = useAppDispatch();
  const loadState = useAppSelector(sheetSelectors.loadState);
  const sheetError = useAppSelector(sheetSelectors.error);
  const cellsOrder = useAppSelector(sheetSelectors.cellsOrder);

  //console.log(cellsOrder);

  const addCellHandler = (typeName: string) => {
    if (typeName.startsWith('app/')) {
      dispatch(sheetActions.insertAppCell(typeName.slice(4), null, -1))
    } else {
      dispatch(sheetActions.insertTextCell('some content', -1))
    }
  }

  const displayToolbar = () => {
    return (
      <AddToolbar 
        className="justify-content-center"
        onAddCellClick={addCellHandler}
      />
    )
  }

  if (loadState === "not_loaded") {
    return (<Container><div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div></Container>)
  } else if (loadState === 'load_error') {
    return (<Container><Alert variant="danger">{sheetError}</Alert></Container>)
  } else {
    return (
      <>
        {cellsOrder.map((cellId, index) => <CellWrapper key={cellId} cellId={cellId} cellIndex={index} />)}
        {cellsOrder.length === 0 ? displayToolbar() : ''}
      </>
    )
  }
}

export default Sheet;