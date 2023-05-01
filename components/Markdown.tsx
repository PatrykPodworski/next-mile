import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

const Markdown = (props: MDXRemoteSerializeResult) => (
  <MDXRemote
    {...props}
    components={{
      a: ({ href, ref, ...props }) => {
        if (!href || isExternalHref(href)) {
          return <a ref={ref} {...props} rel="noopener noreferrer" />;
        }
        return <Link href={href} {...props} />;
      },
    }}
  />
);

const isExternalHref = (href: string) => href.startsWith("http");

export default Markdown;
