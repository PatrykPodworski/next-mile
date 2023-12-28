import { NextRequest } from "next/server";
import Stripe from "stripe";
import { ApiError } from "./ApiError";

export const getStripeEvent = async (
  request: NextRequest
): Promise<ReturnType> => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!secret || !stripeKey) {
    return {
      error: {
        message: "Missing Stripe configuration",
        statusCode: 500,
      },
    };
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!sig) {
    return {
      error: {
        message: "Missing stripe-signature header",
        statusCode: 400,
      },
    };
  }

  try {
    return {
      event: stripe.webhooks.constructEvent(body, sig, secret),
    };
  } catch (err) {
    const message =
      typeof err === "object" &&
      err &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : "";

    return {
      error: {
        message: `Webhook Error: ${message}`,
        statusCode: 400,
      },
    };
  }
};

type ReturnType = {
  event?: Stripe.Event;
  error?: ApiError;
};
