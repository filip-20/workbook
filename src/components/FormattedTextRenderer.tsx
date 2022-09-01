import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import 'katex/dist/katex.min.css';
import styles from './FormattedTextRenderer.module.css'

export interface FormattedTextRendererProps {
  className?: string,
  text: string,
  katexMacros?: object,
}

export default function FormattedTextRenderer(props: FormattedTextRendererProps) {
  const { className, text, katexMacros } = props;

  const rehypeSanitizeOptions = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      div: [
        ...(defaultSchema.attributes?.div || []),
        ['className', 'math', 'math-display']
      ],
      span: [
        ...(defaultSchema.attributes?.span || []),
        ['className', 'math', 'math-inline']
      ]
    }
  }

  const rehypeKatexOptions = katexMacros ? {
    macros: katexMacros
  } : undefined;

  return (
    <ReactMarkdown
      className={`${className} ${styles.formattedText}`}
      children={text}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, rehypeSanitizeOptions], [rehypeKatex, rehypeKatexOptions]]}
    />
  )
}