import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import AppCell from "./AppCell";
import CellToolbar from "./CellToolbar";
import CellWrapper from "./CellWrapper";
import { selectCellsOrder, selectCells } from "./sheetSlice";
import TextCell from "./TextCell";

function Sheet() {
  const cellsOrder = useAppSelector(selectCellsOrder);
  const cells = useAppSelector(selectCells);

  console.log(cellsOrder);

  const displayToolbar = () => {
    return (
      <CellToolbar
        removeGroup={false}
        moveGroup={false}
      />
    )
  }

  const createCell = (id: number, type: string, data: any) => {
    if (type === 'text') {
      return (<TextCell cellId={id} text={data}/>)
    } else {
      return (<AppCell cellId={id} type={type} initialState={data} />)
    }
  }

  return (
    <Container>
      {cellsOrder.map( (cellId, index) => <CellWrapper key={cellId} cellId={cellId} cellIndex={index}>{createCell(cellId, cells[cellId].type, cells[cellId].data)}</CellWrapper>)}
      {cellsOrder.length === 0 ? displayToolbar() : ''}
    </Container>
  )
}

export default Sheet;