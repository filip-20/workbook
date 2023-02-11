import { Button, Form, Row, Col } from "react-bootstrap";
import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import React, { useCallback, useRef, useEffect, useState } from "react";
import FormattedTextRendered from "../../components/FormattedTextRenderer";
import { useAppDispatch } from "../../app/hooks";
import { sheetActions } from "./slice/sheetSlice";
import sheetStorage, { storageActions } from "../sheetStorage/sheetStorage";
import classNames from 'classnames/dedupe';
import styles from "./Comments.module.scss";

export interface CommentEditorProps {
  content?: string,
  title: string,
  saveText: string,
  hideCancel?: boolean,
  unsyncedKey: string,
  onCancel: () => void,
  onSave: (text: string) => void,
  idPrefix?: string,
  className?: string,
  katexMacros?: object,
}

export function CommentEditor(props: CommentEditorProps) {
  const { content, title, saveText, hideCancel, unsyncedKey, onSave, onCancel, idPrefix, className, katexMacros } = props;
  const initialContent = content || '';
  const [text, setText] = useState(initialContent);
  const [preview, setPreview] = useState(false);
  const cmRef = useRef<ReactCodeMirrorRef>(null);

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
    <div className={classNames('clearfix', className)}>
      <Form.Group className='mb-2'>
        <Form.Label
          htmlFor={`${idPrefix}-editor`}
          onClick={() => cmRef.current?.view?.focus()}
          className='mb-1'
        >
          {title}
        </Form.Label>
        <CodeMirror
          value={text}
          onChange={(value, viewUpdate) => {
            setText(value);
          }}
          autoFocus
          ref={cmRef}
          id={`${idPrefix}-editor`}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Check type="switch" label="Náhľad"
          id={`${idPrefix}-preview-switch`}
          className={classNames({'float-start width-auto': !preview})}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPreview(e.target.checked)} />
        {preview && <>
          <div className="text-break">
            <FormattedTextRendered
              text={text}
              katexMacros={katexMacros}
            />
          </div>
        </>}
      </Form.Group>
      <div className="float-end">
        {hideCancel ||
          <Button className="ms-2 my-0" size="sm" onClick={cancelHandler}
            variant="outline-secondary">Zrušiť</Button>}
        <Button className="ms-2 my-0" size="sm" onClick={saveHandler}
          variant="primary">{saveText}</Button>
      </div>
    </div>
  )
}

export interface AddCommentProps {
  className?: string,
  style?: React.CSSProperties,
  cellId: number,
  unsyncedKey: string,
  onSave: () => void,
  onCancel: () => void,
  katexMacros?: object,
}

export default function AddComment(props: AddCommentProps) {
  const { className, style, cellId, unsyncedKey, onSave, onCancel, katexMacros } = props;
  const dispatch = useAppDispatch();

  return (
    <div className={className} style={style}>
      <div className={classNames('small border rounded p-2',
        styles.commentWrapper, styles.isEdited)}
      >
        <CommentEditor
          title="Pridať komentár"
          saveText="Pridať"
          unsyncedKey={unsyncedKey}
          onCancel={onCancel}
          onSave={(text) => {dispatch(sheetActions.addCellComment({ cellId, text })); onSave()} }
          idPrefix={`cell-${cellId}-add-comment`}
          katexMacros={katexMacros}
        />
      </div>
    </div>
  )
}