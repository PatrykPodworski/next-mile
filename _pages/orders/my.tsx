import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import apolloClient from "@/graphql/apolloClient";
import {
  GetUserOrdersDocument,
  GetUserOrdersQuery,
  GetUserOrdersQueryVariables,
  UserOrderFragment,
} from "@/graphql/generated/graphql";
import UserOrderCard, {
  UserOrderCardProps,
} from "@/components/Orders/UserOrderCard";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

const MyOthersPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!data || data.length === 0) {
    return <div>You haven&apos;t ordered anything yet.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 m-auto max-w-3xl">
        {data.map((x) => (
          <UserOrderCard key={x.id} {...x} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      notFound: true,
    };
  }

  const { data, error } = await apolloClient.query<
    GetUserOrdersQuery,
    GetUserOrdersQueryVariables
  >({
    query: GetUserOrdersDocument,
    variables: {
      id: userId,
    },
  });

  if (error || !data) {
    return {
      notFound: true,
    };
  }
  const orders: UserOrderCardProps[] = data.orders.filter(isOrder).map((x) => ({
    id: x.id,
    createdAt: new Date(x.createdAt).toLocaleDateString(),
    status: x.orderStatus ?? "Unknown",
    total: x.total,
    numberOfItems: x.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),
    name: getOrderName(x.orderItems),
    imageUrl: x.orderItems[0]?.product?.images[0]?.url ?? null,
  }));

  return {
    props: {
      data: orders,
    },
  };
};

// Hack to make TypeScript happy
const isOrder = (x: any): x is UserOrderFragment => {
  return x.__typename === "Order";
};

const getOrderName = (orderItems: UserOrderFragment["orderItems"]) => {
  const name = orderItems[0]?.product?.name;
  if (!name) {
    return "Unknown";
  }
  return orderItems.length > 1 ? `${name} and more` : name;
};

export default MyOthersPage;
