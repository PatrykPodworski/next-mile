import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col justify-center items-center">{children}</div>
);

export default Container;
