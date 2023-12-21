import getServerSession from "@/app/api/auth/[...nextauth]/getServerSession";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";

const SignUpPage = async () => {
  const session = await getServerSession();

  if (session && session.user) {
    redirect("/");
  }

  return <SignUpForm />;
};

export default SignUpPage;
