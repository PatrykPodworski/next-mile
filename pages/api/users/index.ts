import apolloClient from "@/graphql/apolloClient";
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/graphql/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { ApolloError } from "@apollo/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, name, password } = req.body;
  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const activationCode = crypto.randomUUID();

  try {
    await apolloClient.mutate<CreateUserMutation, CreateUserMutationVariables>({
      mutation: CreateUserDocument,
      variables: {
        email,
        name,
        password,
        activationCode,
      },
    });
  } catch (error: any) {
    const message =
      error.networkError?.result?.errors[0]?.message ?? "Unknown error";

    res.status(400).json({ message });
    console.log(message);
  }

  res.status(200).json({ message: "Success" });
};

export default handler;
