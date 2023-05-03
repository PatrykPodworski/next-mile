import CartContextProvider from "@/components/Cart/context/CartContextProvider";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import SEO from "../next-seo.config";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <DefaultSeo {...SEO} />
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  </QueryClientProvider>
);

export default App;
