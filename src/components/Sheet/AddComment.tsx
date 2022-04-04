import { Button, Card, Form, Modal } from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export interface AddCommentProps {
  className?: string,
  style?: React.CSSProperties,
  onCancel: () => void,
  onAddComment: (text: string) => void,
}

export default function AddComment(props: AddCommentProps) {
  const { className, style, onCancel, onAddComment } = props;
  const [text, setText] = useState('');
  const [preview, setPreview] = useState(false);

  return (
    <Card className={className} style={style}>
      <Card.Header>
        Pridať komentár
        <Form.Check className="d-inline-block float-end" onChange={(e) => setPreview(e.target.checked)} type="switch" label="Náhľad" />
      </Card.Header>
      <Card.Body>
        <CodeMirror
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
      </Card.Body>
      <Card.Body className="text-end">
        <Button className="me-1 my-0" onClick={() => onCancel()} variant="secondary">Zrušiť</Button>
        <Button className="me-1 my-0" onClick={() => onAddComment(text)} variant="primary">Pridať</Button>
      </Card.Body>
    </Card>
  )
}