import { signIn, signOut, useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <div className="text-base">{`Hello, ${session.user.name}`}</div>
      )}
      {session ? (
        <button className="btn btn-primary btn-sm" onClick={() => signOut()}>
          Sign out
        </button>
      ) : (
        <button className="btn btn-primary btn-sm" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </>
  );
};

export default User;
