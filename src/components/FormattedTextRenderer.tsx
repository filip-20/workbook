import 'katex/dist/katex.min.css';

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export interface FormattedTextRendererProps {
  className?: string,
  text: string,
}

export default function FormattedTextRenderer(props: FormattedTextRendererProps) {
  const { className, text } = props;

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

  return (
    <ReactMarkdown
      className={className}
      children={text}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, rehypeSanitizeOptions], rehypeKatex]}
    />
  )
}