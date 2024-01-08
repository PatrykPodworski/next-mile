import apolloClient from "@/graphql/apolloClient";
import {
  CompleteOrderDocument,
  CompleteOrderMutation,
  CompleteOrderMutationVariables,
} from "@/graphql/generated/graphql";
import { NextRequest, NextResponse } from "next/server";
import { getStripeEvent } from "./getStripeEvent";

export const POST = async (request: NextRequest) => {
  const { error, event } = await getStripeEvent(request);

  if (error) {
    return NextResponse.json(error);
  }

  if (!event) {
    return new NextResponse();
  }

  switch (event.type) {
    case "checkout.session.completed":
      await apolloClient.mutate<
        CompleteOrderMutation,
        CompleteOrderMutationVariables
      >({
        mutation: CompleteOrderDocument,
        variables: {
          stripeCheckoutId: event.data.object.id,
        },
      });
      break;
  }

  return new NextResponse();
};
