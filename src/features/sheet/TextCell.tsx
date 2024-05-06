import { useRef, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import styles from './TextCell.module.scss'
import { useAppSelector } from "../../app/hooks";
import { CellLocator, sheetSelectors } from "./slice/sheetSlice";
import FormattedTextRenderer from "../../components/FormattedTextRenderer";
import TextEditor from "../../components/TextEditor";
import classNames from 'classnames/dedupe';

export interface TextCellProps {
  cellLoc: CellLocator,
  katexMacros: object,
  isEdited: boolean,
  requestEditMode: (isEdited: boolean) => void,
  onDataChanged: (getData: () => string) => void,
}

function TextCell ({ cellLoc, isEdited, katexMacros, requestEditMode, onDataChanged }: TextCellProps) {
  const data = useAppSelector(sheetSelectors.cell(cellLoc)).data as string;
  
  const [content, setContent] = useState(data);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const contentMutable = useRef(data);
  const editText = (
    <div
      className={`${styles.textEdit} ${styles.cmMinHeight}`}
    >
      <TextEditor
        value={content}
        onChange={(value, _) => {
          if (debounceTimer.current !== undefined) {
            clearTimeout(debounceTimer.current);
          }
          debounceTimer.current = setTimeout(() => {
            setContent(value);
            debounceTimer.current = undefined;
          }, 300);
          contentMutable.current = value;
          onDataChanged(() => contentMutable.current);
        }}
        onKeyDownCapture={e => {
          // exit edit mode with Ctrl+Enter
          if (e.key === 'Enter' && e.ctrlKey) {
            requestEditMode(false);
            e.preventDefault();
          }
        }}

      />
    </div>
  );

  return (
    <div
      className={classNames(styles.textCell, { [styles.isEdited]: isEdited })}
    >
      <Row className="g-0 align-items-stretch">
        {isEdited &&
          <Col xs={12} lg={6} className={styles.textEditCol}>{editText}</Col>
        }
        <Col xs={12} lg={isEdited ? 6 : 12}>
          <FormattedTextRenderer
            className={styles.textPreview}
            katexMacros={katexMacros}
            text={content}
          />
        </Col>
      </Row>
    </div>
  )
};

export default TextCell;