import apolloClient from "@/graphql/apolloClient";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserDocument,
} from "@/graphql/generated/graphql";
import { NextRequest, NextResponse } from "next/server";
import { object, string } from "yup";
import crypto from "crypto";
import bcrypt from "bcrypt";
import withValidationErrorHandling from "../utils/withValidationErrorHandling";
import internalServerError from "../utils/internalServerError";

const postHandler = async (request: NextRequest) => {
  const { email, name, password } = await bodySchema.validate(
    await request.json()
  );

  try {
    const activationCode = crypto.randomUUID();

    await apolloClient.mutate<CreateUserMutation, CreateUserMutationVariables>({
      mutation: CreateUserDocument,
      variables: {
        email,
        name,
        password: await bcrypt.hash(password, 12),
        activationCode,
      },
    });

    return new NextResponse();
  } catch (error) {
    return internalServerError("Error creating user");
  }
};

export const POST = withValidationErrorHandling(postHandler);

const bodySchema = object({
  email: string().required(),
  name: string().required(),
  password: string().required(),
});
