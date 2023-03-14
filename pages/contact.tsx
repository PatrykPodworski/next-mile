import Head from "next/head";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold text-rose-500">
          This is the contact page.
        </p>
      </div>
    </>
  );
};

export default Contact;
