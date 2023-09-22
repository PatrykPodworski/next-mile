import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    res.status(500).json({ message: "Missing Stripe configuration" });
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-08-16" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "pl",
      payment_method_types: ["card", "p24", "paypal"],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      line_items: [
        {
          quantity: 2,
          price_data: {
            currency: "pln",
            unit_amount: 1234,
            product_data: {
              name: "Product name",
              description: "Product description",
              images: ["https://thispersondoesnotexist.com"],
            },
          },
        },
      ],
    });

    if (!session.url) {
      res.status(500).json({ message: "Missing session" });
      return;
    }

    res.json({ url: session.url });
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message });
    return;
  }
};

export default handler;
