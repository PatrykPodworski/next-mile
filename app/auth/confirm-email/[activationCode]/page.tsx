import Container from "@/components/Layout/Container";
import Heading from "@/components/Layout/Heading";
import Paragraph from "@/components/Layout/Paragraph";
import apolloClient from "@/graphql/apolloClient";
import {
  PublishUserDocument,
  PublishUserMutation,
  PublishUserMutationVariables,
} from "@/graphql/generated/graphql";
import SignInLink from "./SignInLink";

const ConfirmEmailPage = async ({ params: { activationCode } }: Props) => {
  const userId = await activateUser(activationCode);

  if (!userId) {
    return (
      <Container>
        <Heading className="text-red-500">Invalid activation code!</Heading>
        <Paragraph>The activation code is invalid or has expired.</Paragraph>
      </Container>
    );
  }

  return (
    <Container>
      <Heading>Activation successful!</Heading>
      <Paragraph>
        Thank you for creating an account with us! You can now{" "}
        <SignInLink>log in </SignInLink>.
      </Paragraph>
    </Container>
  );
};

type Props = {
  params: {
    activationCode: string;
  };
};

const activateUser = async (activationCode: string) => {
  const { data } = await apolloClient.mutate<
    PublishUserMutation,
    PublishUserMutationVariables
  >({
    mutation: PublishUserDocument,
    variables: {
      activationCode,
    },
  });

  return data?.publishAppUser?.id ?? null;
};

export default ConfirmEmailPage;
