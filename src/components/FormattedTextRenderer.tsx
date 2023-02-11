import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import classNames from 'classnames/dedupe';

import 'katex/dist/katex.min.css';
import styles from './FormattedTextRenderer.module.css'

export interface FormattedTextRendererProps {
  className?: string,
  text: string,
  katexMacros?: object,
}

export default function FormattedTextRenderer(props: FormattedTextRendererProps) {
  const { className, text, katexMacros } = props;
  
  let rehypeSanitizeOptions = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': [
        ...(defaultSchema.attributes !== undefined ? defaultSchema.attributes['*'] || [] : []),
        'className'
      ]
    }
  }

  const rehypeKatexOptions = katexMacros ? {
    macros: katexMacros
  } : undefined;

  return (
    <ReactMarkdown
      className={classNames(styles.formattedText,className)}
      children={text}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, rehypeSanitizeOptions], [rehypeKatex, rehypeKatexOptions]]}
    />
  )
}