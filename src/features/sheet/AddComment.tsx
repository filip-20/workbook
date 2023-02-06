import { Button, Form } from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAppDispatch } from "../../app/hooks";
import { sheetActions } from "./slice/sheetSlice";
import sheetStorage, { storageActions } from "../sheetStorage/sheetStorage";

export interface CommentEditorProps {
  content?: string,
  title: string,
  saveText: string,
  hideCancel?: boolean,
  unsyncedKey: string,
  onCancel: () => void,
  onSave: (text: string) => void
}

export function CommentEditor(props: CommentEditorProps) {
  const { content, title, saveText, hideCancel, unsyncedKey, onSave, onCancel } = props;
  const initialContent = content || '';
  const [text, setText] = useState(initialContent);
  const [preview, setPreview] = useState(false);

  const dispatch = useAppDispatch();

  const unsynced = text !== initialContent
  useEffect(() => { 
    dispatch(storageActions.unsyncedChange({key: unsyncedKey, unsynced})) 
  }, [unsynced])

  const saveHandler = () => {
    onSave(text);
    setText('');
    dispatch(storageActions.unsyncedChange({key: unsyncedKey, unsynced: false})) 
  }

  const cancelHandler = () => {
    onCancel()
    dispatch(storageActions.unsyncedChange({key: unsyncedKey, unsynced: false})) 
  }

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
        {hideCancel === true ? <></> : <Button className="me-1 my-0" size="sm" onClick={cancelHandler} variant="secondary">Zrušiť</Button>}
        <Button className="me-1 my-0" size="sm" onClick={saveHandler} variant="primary">{saveText}</Button>
      </div>
    </>
  )
}

export interface AddCommentProps {
  className?: string,
  style?: React.CSSProperties,
  cellId: number,
  unsyncedKey: string,
  onSave: () => void,
  onCancel: () => void,
}

export default function AddComment(props: AddCommentProps) {
  const { className, style, cellId, unsyncedKey, onSave, onCancel } = props;
  const dispatch = useAppDispatch();

  return (
    <div className={className} style={style}>
      <div className="border p-2">

      <CommentEditor
        title="Pridať komentár"
        saveText="Pridať"
        unsyncedKey={unsyncedKey}
        onCancel={onCancel}
        onSave={(text) => {dispatch(sheetActions.addCellComment({ cellId, text })); onSave()} }
      />

      </div>
    </div>
  )
}