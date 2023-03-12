import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold text-violet-500">
          This is the about page.
        </p>
      </div>
    </>
  );
};

export default About;
