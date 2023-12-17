import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/_pages/api/auth/[...nextauth]";
import isRequestBody, { Item } from "@/app/api/checkout/isRequestBody";
import apolloClient from "@/graphql/apolloClient";
import { useFragment as getFragmentData } from "@/graphql/generated";
import {
  CartProductFragmentDoc,
  CreateOrderDocument,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderWithUserDocument,
  CreateOrderWithUserMutation,
  CreateOrderWithUserMutationVariables,
  GetCartProductsDocument,
  GetCartProductsQuery,
  GetCartProductsQueryVariables,
} from "@/graphql/generated/graphql";

// TODO: Refactor
export const POST = async (request: NextRequest) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  console.log(process.env);
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Missing Stripe configuration" },
      { status: 500 }
    );
  }

  const body = await request.json();
  if (!isRequestBody(body)) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
  const items = body.items;

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
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }

  const products = data.products.map((x) => mapProduct(x, items));
  const lineItems = products.map(mapLineItem);

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "pl",
      payment_method_types: ["card", "p24", "paypal"],
      success_url: `https://${process.env.VERCEL_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://${process.env.VERCEL_URL}/orders/cancel`,
      line_items: lineItems,
    });

    if (!stripeSession.url) {
      return NextResponse.json(
        { error: "Error creating Stripe session" },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    await apolloClient.mutate<
      CreateOrderMutation | CreateOrderWithUserMutation,
      CreateOrderMutationVariables | CreateOrderWithUserMutationVariables
    >({
      mutation: userId ? CreateOrderWithUserDocument : CreateOrderDocument,
      variables: {
        email: body.emailAddress,
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

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

const mapProduct = (
  product: GetCartProductsQuery["products"][0],
  items: Item[]
) => {
  const fragment = getFragmentData(CartProductFragmentDoc, product);
  const item = items.find((x) => x.id === fragment.id);
  return {
    ...fragment,
    quantity: item?.quantity ?? 0,
  };
};

const mapLineItem = (product: ReturnType<typeof mapProduct>) => ({
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
});
