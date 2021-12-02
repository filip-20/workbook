import { Card, Container } from "react-bootstrap";

import styles from './SheetPage.module.css'


function SheetPage() {
  return (
      <Card className={`shadow-lg ${styles.sheetContainer}`}>
        <Card.Body>
          empty
        </Card.Body>
      </Card>
  )
}

export default SheetPage;