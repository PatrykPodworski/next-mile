"use client";

import { signIn } from "next-auth/react";
import { ReactNode } from "react";

const SignInLink = ({ children }: SignInLinkProps) => (
  <span
    className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
    onClick={() => signIn()}
  >
    {children}
  </span>
);

type SignInLinkProps = {
  children?: ReactNode;
};

export default SignInLink;
