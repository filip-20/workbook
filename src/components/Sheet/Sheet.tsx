import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import AppCell from "./AppCell";
import CellToolbar from "./CellToolbar";
import CellWrapper from "./CellWrapper";
import { selectCells } from "./sheetSlice";
import TextCell from "./TextCell";

function Sheet() {
  const cells = useAppSelector(selectCells)

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
      {cells.map(cell => <CellWrapper key={cell.id} cellId={cell.id}>{createCell(cell.id, cell.type, cell.data)}</CellWrapper>)}
      {cells.length === 0 ? displayToolbar() : ''}
    </Container>
  )
}

export default Sheet;