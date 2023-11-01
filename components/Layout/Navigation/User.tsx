import { signIn, signOut, useSession } from "next-auth/react";

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
        <button className="btn btn-primary btn-sm" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </>
  );
};

export default User;
