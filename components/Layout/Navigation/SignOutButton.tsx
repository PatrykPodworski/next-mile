"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button onClick={() => signOut()} className="btn btn-primary btn-sm">
      Sign out
    </button>
  );
};

export default SignOutButton;
