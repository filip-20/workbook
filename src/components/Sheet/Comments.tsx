import { Button, Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { sheetActions, sheetSelectors } from "../../store/sheetSlice"
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import Moment from "react-moment";
import 'moment/locale/sk';
import { authSelectors } from "../../store/authSlice";
import { BiTrash } from "react-icons/bi";

export interface CommentsProps {
  className?: string,
  style?: React.CSSProperties,
  cellId: number,
}

export default function Comments(props: CommentsProps) {
  const { className, style, cellId } = props;
  const user = useAppSelector(authSelectors.user)
  const comments = useAppSelector(sheetSelectors.cellComments(cellId));

  const dispatch = useAppDispatch();

  const canDelete = (author: string) => user ? user.login : false;
  const handleDelete = (commentId: number) => dispatch(sheetActions.remmoveCellComment({cellId, commentId}));

  const renderComment = (comment: { id: number, author: string, timestamp: number, text: string }) => (
    <Card key={comment.id}>
      <Card.Header>
        {comment.author}
        <div style={{float: 'right'}}>
        <Moment date={new Date(comment.timestamp)} locale='sk' fromNow/>
        {canDelete(comment.author) && <Button className="ms-1" size="sm" variant="danger" onClick={() => handleDelete(comment.id)}><BiTrash /></Button>}
        </div>
      </Card.Header>
      <Card.Body>
        <ReactMarkdown
          className="border"
          children={comment.text}
          remarkPlugins={[RemarkMathPlugin]}
          rehypePlugins={[rehypeKatex]}
        />
      </Card.Body>
    </Card>
  )

  if (comments.length === 0) {
    return (<></>)
  }

  return (
    <div className={className} style={style}>
      {comments.map(c => renderComment(c))}
    </div>
  )
}