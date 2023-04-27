import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

const Markdown = (props: MDXRemoteSerializeResult) => (
  <MDXRemote
    {...props}
    components={{
      a: ({ href, ref, ...props }) => {
        if (!href) {
          return <a ref={ref} {...props} />;
        }
        return <Link href={href} {...props} />;
      },
    }}
  />
);

export default Markdown;
