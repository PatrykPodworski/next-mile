import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>NextMile</title>
      </Head>
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold text-green-500">
          This is the index page.
        </p>
      </div>
    </>
  );
};

export default Home;
