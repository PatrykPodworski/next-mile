import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>NextMile</title>
        <meta name="description" content="Get access to the best e-learning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href={"/users"}>See the users</Link>
      </main>
    </>
  );
}
