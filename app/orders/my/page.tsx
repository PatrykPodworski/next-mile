import getServerSession from "@/app/api/auth/[...nextauth]/getServerSession";
import UserOrderCard, {
  UserOrderCardProps,
} from "@/components/Orders/UserOrderCard";
import apolloClient from "@/graphql/apolloClient";
import { useFragment as getFragmentData } from "@/graphql/generated";
import {
  GetUserOrdersQuery,
  GetUserOrdersQueryVariables,
  GetUserOrdersDocument,
  UserOrderFragmentDoc,
  UserOrderFragment,
} from "@/graphql/generated/graphql";
import { notFound } from "next/navigation";

const MyOrdersPage = async () => {
  const session = await getServerSession();
  const userId = session?.user?.id;

  if (!userId) {
    notFound();
  }

  const orders = await getUserOrders(userId);

  if (orders.length === 0) {
    return <div>You haven&apos;t ordered anything yet.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 m-auto max-w-3xl">
        {orders.map((x) => (
          <UserOrderCard key={x.id} {...x} />
        ))}
      </div>
    </>
  );
};

const getUserOrders = async (userId: string) => {
  const { data } = await apolloClient.query<
    GetUserOrdersQuery,
    GetUserOrdersQueryVariables
  >({
    query: GetUserOrdersDocument,
    variables: {
      id: userId,
    },
  });

  const orders = getFragmentData(UserOrderFragmentDoc, data.orders);
  console.log(orders[0]?.orderItems[0]);
  const mapped: UserOrderCardProps[] = orders.map((x) => ({
    id: x.id,
    createdAt: new Date(x.createdAt).toLocaleDateString(),
    status: x.orderStatus ?? "Unknown",
    total: x.total,
    numberOfItems: x.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),
    name: getOrderName(x.orderItems),
    imageUrl: x.orderItems[0]?.product?.images[0]?.url ?? null,
  }));

  return mapped;
};

const getOrderName = (orderItems: UserOrderFragment["orderItems"]) => {
  const name = orderItems[0]?.product?.name;
  if (!name) {
    return "Unknown";
  }
  return orderItems.length > 1 ? `${name} and more` : name;
};

export default MyOrdersPage;
