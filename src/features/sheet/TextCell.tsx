import { useEffect, useRef, useState } from "react";
import styles from './TextCell.module.css'
import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { markdown } from '@codemirror/lang-markdown';
import FormattedTextRenderer from "../../components/FormattedTextRenderer";

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
    <div>
      {isEdited && editText}
      <FormattedTextRenderer
        className={styles.textCell}
        katexMacros={katexMacros}
        text={content}
      />
    </div>
  )
}

export default TextCell;