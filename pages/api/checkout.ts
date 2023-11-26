import apolloClient from "@/graphql/apolloClient";
import {
  GetCartProductsDocument,
  GetCartProductsQuery,
  GetCartProductsQueryVariables,
  CartProductFragment,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderDocument,
  CreateOrderWithUserDocument,
  CreateOrderWithUserMutation,
  CreateOrderWithUserMutationVariables,
} from "@/graphql/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { isRequestBody } from "./RequestBody";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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

  if (!isRequestBody(req.body)) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-08-16" });

  const items = req.body.items;
  const { data, error } = await apolloClient.query<
    GetCartProductsQuery,
    GetCartProductsQueryVariables
  >({
    query: GetCartProductsDocument,
    variables: {
      ids: items.map((x) => x.id),
    },
  });

  if (error || !data) {
    res.status(500).json({ message: "Error fetching products" });
    return;
  }

  const products = data.products.filter(isProduct).map((product) => {
    const item = items.find((x) => x.id === product.id);
    return {
      ...product,
      quantity: item?.quantity ?? 0,
    };
  });

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "pl",
      payment_method_types: ["card", "p24", "paypal"],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/cancel`,
      line_items: products.map((product) => ({
        quantity: product.quantity,
        price_data: {
          currency: "pln",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description,
            images: product.images.map((image) => image.url),
          },
        },
      })),
    });

    if (!stripeSession.url) {
      res.status(500).json({ message: "Missing session" });
      return;
    }

    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;

    await apolloClient.mutate<
      CreateOrderMutation | CreateOrderWithUserMutation,
      CreateOrderMutationVariables | CreateOrderWithUserMutationVariables
    >({
      mutation: userId ? CreateOrderWithUserDocument : CreateOrderDocument,
      variables: {
        email: req.body.emailAddress,
        stripeCheckoutId: stripeSession.id,
        total: stripeSession.amount_total ?? 0,
        userId: userId ?? "",
        items: products.map((product) => ({
          product: {
            connect: {
              slug: product.slug,
            },
          },
          quantity: product.quantity,
          total: product.price * product.quantity,
        })),
      },
    });

    res.json({ url: stripeSession.url });
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message });
    return;
  }
};

// Hack to make TypeScript happy
const isProduct = (product: any): product is CartProductFragment => {
  return product.__typename === "Product";
};

export default handler;
