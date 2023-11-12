import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const User = () => {
  const { data } = useSession();
  return (
    <>
      {data && <div className="text-base">{`Hello, ${data.user.name}`}</div>}
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
