import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown"
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';
import styles from './TextCell.module.css'
import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch } from "../../store/hooks";
import { sheetActions } from "../../store/sheetSlice";
import { markdown } from '@codemirror/lang-markdown';

export interface TextCellProps {
  cellId: number,
  text: string,
  isEdited: boolean,
}

const defaultProps: { text: string } = {
  text: '',
}

function TextCell(props: TextCellProps) {
  const { cellId, isEdited } = props;
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(props.text);
  const cellChanged = useRef(false);
  const mutableContent = useRef(props.text);
  const updateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // this should be triggered after user exits from edit mode
  useEffect(() => {
    if (!isEdited && cellChanged.current === true) {
      console.log('after close text cell update');
      dispatch(sheetActions.updateCellData({cellId: cellId, data: content}));
      const timeoutId = updateTimeout.current;
      if (timeoutId !== null) {
        console.log('canceling delayed update');
        clearTimeout(timeoutId);
      } 
    }
  }, [isEdited]);

  useEffect(() => {
    if (updateTimeout.current === null && cellChanged.current === true) {
      console.log('scheduling update after 10 seconds');
      updateTimeout.current = setTimeout(() => {
        console.log('delayed text cell update');
        dispatch(sheetActions.updateCellData({cellId: cellId, data: mutableContent.current}));
        updateTimeout.current = null;
      }, 10000)
    }
  }, [content]);

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
          mutableContent.current = value;
          cellChanged.current = true;
        }}
      />
    </div>
  );

  const markdownDisp = (
    <ReactMarkdown
      className={styles.textCell}
      children={content}
      remarkPlugins={[RemarkMathPlugin]}
      rehypePlugins={[rehypeKatex]}
    />
  )

  return (
    <div>
      {isEdited && editText}
      {markdownDisp}
    </div>
  )
}

TextCell.defaultProps = defaultProps

export default TextCell;