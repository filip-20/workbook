import { useEffect, useRef, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import styles from './TextCell.module.scss'
import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { markdown } from '@codemirror/lang-markdown';
import FormattedTextRenderer from "../../components/FormattedTextRenderer";
import classNames from 'classnames/dedupe';

export interface TextCellProps {
  katexMacros: object,
  isEdited: boolean,
  data: string,
  onDataChanged: (getData: () => string) => void,
}

function TextCell({ data, isEdited, katexMacros, onDataChanged }: TextCellProps) {
  const [ content, setContent ] = useState(data);
  const contentMutable = useRef(data);
  const editText = (
    <div
      className={`${styles.textEdit} ${styles.cmMinHeight}`}
      onDoubleClick={(e) => isEdited && e.stopPropagation()}
    >
      <CodeMirror
        autoFocus
        extensions={[markdown()]}
        value={content}
        onChange={(value, viewUpdate) => {
          setContent(value);
          contentMutable.current = value;
          onDataChanged(() => contentMutable.current);
        }}
      />
    </div>
  );

  return (
    <div className={classNames(styles.textCell, {[styles.isEdited]: isEdited})}>
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
}

export default TextCell;