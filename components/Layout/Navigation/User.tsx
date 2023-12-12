import Link from "next/link";
import NavigationLink from "./NavigationLink";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";

const User = async () => {
  const session = await getServerSession();
  return (
    <>
      {session && (
        <NavigationLink href="/orders/my">{`Hello, ${session.user.name}`}</NavigationLink>
      )}
      {session ? (
        <SignOutButton />
      ) : (
        <Link href="/auth/sign-up" className="btn btn-primary btn-sm">
          Sign up
        </Link>
      )}
    </>
  );
};

export default User;
