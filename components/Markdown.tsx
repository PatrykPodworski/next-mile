import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Markdown = ({ children }: MarkdownProps) => (
  <ReactMarkdown
    components={{
      a: ({ node, href, ...props }) => {
        if (!href) {
          return <a {...props} />;
        }
        return <Link href={href} {...props} />;
      },
    }}
    className="prose lg:prose-xl"
  >
    {children}
  </ReactMarkdown>
);
type MarkdownProps = {
  children: string;
};

export default Markdown;
