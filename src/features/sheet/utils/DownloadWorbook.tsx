import { Button } from "react-bootstrap"
import { useAppDispatch } from "../../../app/hooks"
import { downloadSheet } from "../slice/sheetSlice"
import { BiDownload } from "react-icons/bi"


export default function DownloadWorkbook() {
  const dispatch = useAppDispatch()
  return <Button className="mx-2" variant="success" onClick={() => dispatch(downloadSheet())}><BiDownload />Download workbook</Button>
}