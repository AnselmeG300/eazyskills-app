"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownViewerProps {
  content: string;
}

/**
 * Composant d'affichage de contenu Markdown avec rendu enrichi.
 * Utilisé pour afficher les réponses de l'assistant.
 */
export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-sm leading-relaxed text-justify whitespace-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside my-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          h2: ({ node, ...props }) => (
            <h2 className="mt-4 mb-2 text-lg font-bold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-3 mb-2 text-base font-semibold" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              style={{ textDecoration: "underline", color: "#1f6feb" }}
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
