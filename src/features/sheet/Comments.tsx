import { Row, Col, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CellComment, CellLocator, sheetActions, sheetSelectors } from "./slice/sheetSlice";
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

const EditCommentMenu = (props: { onDelete: () => void, onEdit: () => void }) =>
  <Dropdown>
    <Dropdown.Toggle variant="secondary" size="sm"
      className="pt-1 pb-0"/>
    <Dropdown.Menu>
      <Dropdown.Item onClick={props.onEdit}>Upraviť</Dropdown.Item>
      <Dropdown.Item onClick={props.onDelete}>Zmazať</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

interface CommentProps {
  cellLoc: CellLocator,
  comment: CellComment,
  katexMacros?: object,
}

function Comment({ cellLoc, comment, katexMacros }: CommentProps) {
  const { id: cellId } = cellLoc;
  const [isEdited, setIsEdited] = useState(false);
  const user = useAppSelector(authSelectors.user);

  const dispatch = useAppDispatch();
  const canEdit = user ? user.login === comment.author : false;
  const handleDelete = () => dispatch(sheetActions.remmoveCellComment({ cellLoc, commentId: comment.id }));
  const handleCommentUpdate = (text:string) => {
    if (JSON.stringify(text) !== JSON.stringify(comment.text)) {
      dispatch(sheetActions.updateCellComment({ cellLoc, commentId: comment.id, text }));  
    }
    setIsEdited(false);
  }

  return (
    <div key={comment.id}
      className={classNames('border rounded p-2 mb-2 small',
        styles.commentWrapper, {[styles.isEdited]: isEdited})}
    >
      <Row className="g-2 flex-nowrap mb-1">
        <Col xs='auto'>
          <UserAvatar username={comment.author}
            className={classNames('border', styles.commentAvatar)} />
        </Col>
        <Col className='align-self-stretch flex-shrink-1
                        d-flex flex-column justify-content-center'>
            <div className="overflow-hidden">{comment.author}</div>
            <Moment className="text-muted overflow-hidden"
              date={new Date(comment.timestamp)}
              withTitle
              titleFormat='ddd, MMM D, YYYY \a\t H:mm'
              format='MMM D'
              locale='en' fromNowDuring={7*24*3600000} />
        </Col>
        <Col xs='auto'>
          {canEdit &&
            <EditCommentMenu
              onEdit={() => setIsEdited(true)}
              onDelete={handleDelete}
            />}
        </Col>
      </Row>
      <div>
        {
          isEdited ?
            <CommentEditor
              content={comment.text}
              title="Upraviť komentár"
              saveText="Uložiť"
              unsyncedKey={`editedCellComment/${cellId}/${comment.id}`}
              onCancel={() => setIsEdited(false)}
              onSave={handleCommentUpdate}
              katexMacros={katexMacros}
              idPrefix={`cell-${cellId}-comment-${comment.id}`}
            />
            :
            <FormattedTextRenderer
              text={comment.text}
              katexMacros={katexMacros}
            />
        }

      </div>
    </div >
  )
}

export interface CommentsProps {
  className?: string,
  style?: React.CSSProperties,
  cellLoc: CellLocator,
  katexMacros?: object,
}

export default function Comments({ className, style, cellLoc, katexMacros }: CommentsProps) {
  const comments = useAppSelector(sheetSelectors.cellComments(cellLoc));
  const commonCommentProps = { cellLoc, katexMacros };
  if (comments.length === 0) {
    return (<></>)
  }
  return (
    <div className={className} style={style}>
      {comments.map(c => <Comment key={c.id} comment={c} {...commonCommentProps} />)}
    </div>
  )
}