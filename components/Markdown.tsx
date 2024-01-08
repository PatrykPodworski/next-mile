import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

const Markdown = ({ source }: { source: string }) => (
  <MDXRemote
    source={source}
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
