import clsx from "clsx";
import { ReactNode } from "react";

const PaginationItem = ({ children, active, onClick }: PaginationItemProps) => (
  <button
    onClick={onClick}
    className={clsx("btn btn-ghost", active && "btn-active")}
  >
    {children}
  </button>
);
type PaginationItemProps = {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
};

export default PaginationItem;
