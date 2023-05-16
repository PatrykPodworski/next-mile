import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Get access to the best e-learning" />
      </Head>
      <body className="bg-neutral-50 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
