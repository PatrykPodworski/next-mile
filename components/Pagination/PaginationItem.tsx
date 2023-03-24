import clsx from "clsx";
import { ReactNode } from "react";

const PaginationItem = ({ children, active, onClick }: PaginationItemProps) => (
  <li
    onClick={onClick}
    className={clsx(
      "text-lg text-neutral-900 border-neutral-900 p-2 hover:bg-blue-100 transition-colors duration-300",
      active ? "border-b-2" : "cursor-pointer"
    )}
  >
    {children}
  </li>
);
type PaginationItemProps = {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
};

export default PaginationItem;
