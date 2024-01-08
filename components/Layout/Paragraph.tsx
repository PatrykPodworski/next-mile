import { PropsWithChildren } from "react";

const Paragraph = ({ children }: PropsWithChildren) => (
  <p className="text-lg text-gray-600 max-w-prose">{children}</p>
);

export default Paragraph;
