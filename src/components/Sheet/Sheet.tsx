import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppCell from "./AppCell";
import CellToolbar from "./CellToolbar";
import CellWrapper from "./CellWrapper";
import { selectCells } from "./sheetSlice";
import TextCell from "./TextCell";

function Sheet() {
  const cells = useAppSelector(selectCells)
  const dispatch = useAppDispatch();

  const displayToolbar = () => {
    return (
      <CellToolbar
        removeGroup={false}
        moveGroup={false}
      />
    )
  }

  const createCell = (type: string, data: string) => {
    if (type === 'text') {
      return (<TextCell text={data}/>)
    } else {
      return (<AppCell type={type} />)
    }
  }

  return (
    <Container>
      {cells.map(cell => <CellWrapper key={cell.id} cellId={cell.id}>{createCell(cell.type, cell.data)}</CellWrapper>)}
      {cells.length == 0 ? displayToolbar() : ''}
    </Container>
  )
}

export default Sheet;