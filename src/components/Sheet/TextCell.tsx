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

  useEffect(() => {
    if (!isEdited) {
      dispatch(sheetActions.updateCellData({cellId: cellId, data: content}));
    }
  }, [isEdited]);

  const editText = (
    <div
      className={styles.textEdit}
      onDoubleClick={(e) => isEdited && e.stopPropagation()}
    >
      <CodeMirror
        value={content}
        onChange={(value, viewUpdate) => {
          setContent(value);
          console.log('value:', value);
        }}
      />
    </div>
  );

  const markdown = (
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
      {markdown}
    </div>
  )
}

TextCell.defaultProps = defaultProps

export default TextCell;