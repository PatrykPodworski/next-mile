import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripeWebhook: NextApiHandler = async (req, res) => {
  const event = await getStripeEvent(req, res);
  if (!event) {
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      console.log(event.data);
      break;
  }

  res.status(200).json({ received: true });
};

const getStripeEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!secret || !stripeKey) {
    res.status(500).json({ message: "Missing Stripe configuration" });
    return;
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-08-16" });
  const sig = req.headers["stripe-signature"] ?? "";
  const rawBody = await getRawBody(req);

  try {
    return stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const message =
      typeof err === "object" &&
      err &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : "";

    res.status(400).send(`Webhook Error: ${message}`);
    return;
  }
};

export default stripeWebhook;
