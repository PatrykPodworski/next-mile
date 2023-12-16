import apolloClient from "@/graphql/apolloClient";
import {
  PublishUserDocument,
  PublishUserMutation,
  PublishUserMutationVariables,
} from "@/graphql/generated/graphql";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ConfirmEmail = () => {
  const [publishedUser, setPublishedUser] = useState<string | null>();
  const router = useRouter();
  const activationCode = router.query.activationCode;

  useEffect(() => {
    if (typeof activationCode !== "string") {
      return;
    }

    apolloClient
      .mutate<PublishUserMutation, PublishUserMutationVariables>({
        mutation: PublishUserDocument,
        variables: {
          activationCode,
        },
      })
      .then((result) => {
        setPublishedUser(result.data?.publishAppUser?.id ?? null);
      });
  }, [activationCode]);

  if (publishedUser === undefined) {
    return (
      <div className="flex flex-col items-center pt-16">
        <p className="text-xl font-bold text-gray-500">Loading</p>
      </div>
    );
  }

  if (publishedUser === null) {
    return (
      <div className="flex flex-col items-center pt-16">
        <p className="text-xl font-bold text-red-500">
          Invalid activation code!
        </p>
        <p className="text-lg text-gray-700">
          The activation code is invalid or has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-16">
      <p className="text-xl font-bold text-primary">Activation successful!</p>
      <p className="text-lg text-gray-700">
        Thank you for creating an account with us! You can now{" "}
        <span
          className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
          onClick={() => signIn()}
        >
          log in
        </span>
        .
      </p>
    </div>
  );
};

export default ConfirmEmail;
