import { Row, Col, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CellComment, sheetActions, sheetSelectors } from "./slice/sheetSlice";
import Moment from "react-moment";
import 'moment/locale/sk';
import { authSelectors } from "../auth/authSlice";
import UserAvatar from "../auth/UserAvatar";
import { BsThreeDots } from "react-icons/bs";
import React, { useState } from "react";
import { CommentEditor } from "./AddComment";
import FormattedTextRenderer from "../../components/FormattedTextRenderer";
import classNames from 'classnames/dedupe';
import styles from "./Comments.module.scss";

function EditCommentMenu(props: { onDelete: () => void, onEdit: () => void }) {
  const MenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, onClick }, ref) => (
    <Button variant="secondary" size="sm"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick !== undefined && onClick(e)
      }}
    >
      {children}
    </Button>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={MenuButton}>
        <BsThreeDots />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={props.onEdit}>Upraviť</Dropdown.Item>
        <Dropdown.Item onClick={props.onDelete}>Zmazať</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

interface CommentProps {
  cellId: number,
  comment: CellComment,
}

function Comment(props: CommentProps) {
  const { cellId, comment } = props;

  const [isEdited, setIsEdited] = useState(false);

  const user = useAppSelector(authSelectors.user);

  const dispatch = useAppDispatch();
  const canEdit = user ? user.login === comment.author : false;
  const handleDelete = () => dispatch(sheetActions.remmoveCellComment({ cellId, commentId: comment.id }));
  const handleCommentUpdate = (text:string) => {
    if (JSON.stringify(text) !== JSON.stringify(comment.text)) {
      dispatch(sheetActions.updateCellComment({ cellId, commentId: comment.id, text }));  
    }
    setIsEdited(false);
  }

  return (
    <div key={comment.id}
      className={classNames('border rounded p-2 mb-2 small',
        styles.commentWrapper, {[styles.isEdited]: isEdited})}
    >
      <div className="small" style={{ display: 'flex' }}>
        <UserAvatar username={comment.author} className="border border-secondary my-auto" style={{ height: '3em' }} />
        <div className="ms-2" style={{ flexGrow: '1' }}>
          <div>{comment.author}</div>
          <Moment className="small" date={new Date(comment.timestamp)} locale='sk' fromNow />
        </div>
        <div style={{ float: 'right' }}>
          {canEdit && <EditCommentMenu onEdit={() => setIsEdited(true)} onDelete={handleDelete} />}
        </div>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        {
          isEdited ?
            <CommentEditor
              content={comment.text}
              title="Upraviť komentár"
              saveText="Uložiť"
              unsyncedKey={`editedCellComment/${cellId}/${comment.id}`}
              onCancel={() => setIsEdited(false)}
              onSave={handleCommentUpdate}
              idPrefix={`cell-${cellId}-comment-${comment.id}`}
            />
            :
            <FormattedTextRenderer
              text={comment.text}
            />
        }

      </div>
    </div >
  )
}

export interface CommentsProps {
  className?: string,
  style?: React.CSSProperties,
  cellId: number,
}

export default function Comments(props: CommentsProps) {
  const { className, style, cellId } = props;
  const comments = useAppSelector(sheetSelectors.cellComments(cellId));

  if (comments.length === 0) {
    return (<></>)
  }

  return (
    <div className={className} style={style}>
      {comments.map(c => <Comment cellId={cellId} comment={c} />)}
    </div>
  )
}