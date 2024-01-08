"use client";

import CartContextProvider from "@/components/Cart/context/CartContextProvider";
import apolloClient from "@/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ApolloProvider client={apolloClient}>
          <CartContextProvider>{children}</CartContextProvider>
        </ApolloProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
