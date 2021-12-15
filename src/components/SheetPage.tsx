import { Card } from "react-bootstrap";
import Sheet from "./Sheet/Sheet";

import styles from './SheetPage.module.css'


function SheetPage() {
  return (
      <Card className={`shadow-lg ${styles.sheetContainer}`}>
        <Card.Body>
          <Sheet/>
        </Card.Body>
      </Card>
  )
}

export default SheetPage;