import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown"
import RemarkMathPlugin from 'remark-math';
import 'katex/dist/katex.min.css';
import styles from './TextCell.module.css'
import rehypeKatex from "rehype-katex";

export interface TextCellProps {
  text?: string
}

const defaultProps: TextCellProps = {
  text: ''
}

function TextCell(props: TextCellProps) {
  const [content, setContent] = useState(props.text!!);
  const [editing, setEditing] = useState(false);
  const contentEl = useRef<HTMLTextAreaElement>(null);

  let _content = content
  const toggleEdit = (target: EventTarget) => {
    if (editing) {
      setContent(_content);
    }
    setEditing(!editing);
  }

  const updateTextAreaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight + 5).toString() + 'px'
  }

  /* adapt textarea's height to its content after going to edit mode */
  useEffect(() => {
    if (editing) {
      const txt = contentEl.current;
      if (txt != null) {
        updateTextAreaHeight(txt)
      }
    }
  });

  const editCell = () => {
    return (<textarea ref={contentEl} className={styles.textedit} onChange={e => {setContent(e.target.value); updateTextAreaHeight(e.target)}} value={content}></textarea>)
  }

  const displayCell = () => {
    return (
      <ReactMarkdown
        children={content}
        remarkPlugins={[RemarkMathPlugin]}
        rehypePlugins={[rehypeKatex]}
      />)
  }

  return (
    <Container
      onDoubleClick={(e) => toggleEdit(e.target)}
    >
      {editing ? editCell() : displayCell()}
    </Container>
  )
}

TextCell.defaultProps = defaultProps

export default TextCell;