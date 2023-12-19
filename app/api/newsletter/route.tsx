import { NextRequest, NextResponse } from "next/server";
import bodySchema from "./bodySchema";
import withValidationErrorHandling from "../utils/withValidationErrorHandling";
import internalServerError from "../utils/internalServerError";

const postHandler = async (request: NextRequest) => {
  const body = await bodySchema.validate(await request.json());

  if (!process.env.MAILER_LITE_API_TOKEN || !process.env.MAILER_LITE_GROUP_ID) {
    return internalServerError("Missing MailerLite configuration");
  }

  try {
    const created = await createSubscriber(body.emailAddress);

    if (!created) {
      return internalServerError("Error subscribing to newsletter");
    }

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return internalServerError("Error subscribing to newsletter");
  }
};

export const POST = withValidationErrorHandling(postHandler);

const createSubscriber = async (emailAddress: string) => {
  const response = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILER_LITE_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: emailAddress,
        groups: [process.env.MAILER_LITE_GROUP_ID],
      }),
    }
  );

  return response.ok;
};
