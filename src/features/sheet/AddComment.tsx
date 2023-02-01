import { Button, Form } from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAppDispatch } from "../../app/hooks";
import { sheetActions } from "./slice/sheetSlice";

export interface CommentEditorProps {
  content?: string,
  title: string,
  saveText: string,
  hideCancel?: boolean,
  onCancel: () => void,
  onSave: (text: string) => void
}

export function CommentEditor(props: CommentEditorProps) {
  const { content, title, saveText, hideCancel, onSave, onCancel } = props;
  const [text, setText] = useState(content || '');
  const [preview, setPreview] = useState(false);

  return (
    <>
      <div>
        <div className="d-inline-block">{title}</div>
        <Form.Check className="d-inline-block float-end" onChange={(e) => setPreview(e.target.checked)} type="switch" label="Náhľad" />
      </div>
      <div className="my-2">
        <CodeMirror
          value={text}
          onChange={(value, viewUpdate) => {
            setText(value);
          }}
        />
        {preview && <ReactMarkdown
          className={"border"}
          children={text}
          remarkPlugins={[RemarkMathPlugin]}
          rehypePlugins={[rehypeKatex]}
        />}
      </div>
      <div className="text-end">
        {hideCancel === true ? <></> : <Button className="me-1 my-0" size="sm" onClick={() => onCancel()} variant="secondary">Zrušiť</Button>}
        <Button className="me-1 my-0" size="sm" onClick={() => {onSave(text); setText('')}} variant="primary">{saveText}</Button>
      </div>
    </>
  )
}

export interface AddCommentProps {
  className?: string,
  style?: React.CSSProperties,
  cellId: number,
  onSave: () => void,
  onCancel: () => void,
}

export default function AddComment(props: AddCommentProps) {
  const { className, style, cellId, onCancel } = props;
  const dispatch = useAppDispatch();

  return (
    <div className={className} style={style}>
      <div className="border p-2">

      <CommentEditor 
        title="Pridať komentár"
        saveText="Pridať"
        onCancel={onCancel}
        onSave={(text) => {dispatch(sheetActions.addCellComment({ cellId, text })); props.onSave()} }
      />

      </div>
    </div>
  )
}