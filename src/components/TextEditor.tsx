import React, { forwardRef } from 'react';
import { EditorView } from '@codemirror/view';
import CodeMirror, { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import './TextEditor.module.scss';

export type { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';

const TextEditor = forwardRef<ReactCodeMirrorRef, ReactCodeMirrorProps>(
  ({extensions = [], autoFocus = true, ...props}, ref) =>
    <CodeMirror
      ref={ref}
      autoFocus={autoFocus}
      extensions={[EditorView.lineWrapping, markdown(), ...extensions]}
      {...props}
    />
)

export default TextEditor;
