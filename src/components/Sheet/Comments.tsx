import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { CellComment, sheetActions, sheetSelectors } from "../../store/sheetSlice"
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import Moment from "react-moment";
import 'moment/locale/sk';
import { authSelectors } from "../../store/authSlice";
import { BiTrash } from "react-icons/bi";
import UserAvatar from "../UserAvatar";

export interface CommentProps {
  cellId: number,
  comment: CellComment
}

export function Comment(props: CommentProps) {
  const { cellId, comment } = props;

  const user = useAppSelector(authSelectors.user)

  const dispatch = useAppDispatch();
  const canDelete = (author: string) => user ? user.login : false;
  const handleDelete = (commentId: number) => dispatch(sheetActions.remmoveCellComment({ cellId, commentId }));

  return (
    <div key={comment.id} className="border p-2">
      <div className="small" style={{ display: 'flex', alignItems: 'center' }}>
        <UserAvatar username={comment.author} className="border border-secondary" style={{ height: '2rem' }} />
        <div className="ms-2" style={{ flexGrow: '1' }}>
          <div>{comment.author}</div>
          <Moment className="small" date={new Date(comment.timestamp)} locale='sk' fromNow />
        </div>
        <div style={{ float: 'right' }}>
          {canDelete(comment.author) && <Button className="ms-1" size="sm" variant="danger" onClick={() => handleDelete(comment.id)}><BiTrash /></Button>}
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <ReactMarkdown
          className="small pb-0 mb-0"
          children={comment.text}
          remarkPlugins={[RemarkMathPlugin]}
          rehypePlugins={[rehypeKatex]}
        />
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