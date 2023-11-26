import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import NavigationLink from "./NavigationLink";

const User = () => {
  const { data } = useSession();
  return (
    <>
      {data && (
        <NavigationLink href="/orders/my">{`Hello, ${data.user.name}`}</NavigationLink>
      )}
      {data ? (
        <button className="btn btn-primary btn-sm" onClick={() => signOut()}>
          Sign out
        </button>
      ) : (
        <Link href="/auth/sign-up" className="btn btn-primary btn-sm">
          Sign up
        </Link>
      )}
    </>
  );
};

export default User;
