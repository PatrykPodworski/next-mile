import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

const LinkPaginationItem = ({
  children,
  active,
  href,
}: LinkPaginationItemProps) => (
  <Link
    href={href}
    className={clsx(
      "btn btn-ghost hover:bg-neutral-100",
      active && "font-bold text-xl"
    )}
  >
    {children}
  </Link>
);

type LinkPaginationItemProps = {
  children: ReactNode;
  active?: boolean;
  href: string;
};

export default LinkPaginationItem;
