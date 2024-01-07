import clsx from "clsx";
import { ReactNode } from "react";

const Heading = ({ children, className }: ComponentProps) => (
  <h1 className={clsx("text-4xl font-bold", className)}>{children}</h1>
);

export default Heading;

type ComponentProps = {
  children?: ReactNode;
  className?: string;
};
