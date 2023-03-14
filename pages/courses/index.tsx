import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Fragment } from "react";

const Courses = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Courses list</title>
    </Head>
    <div className="flex flex-col">
      {data.map((x) => (
        <Fragment key={x.id}>
          <p className="text-xl font-bold text-amber-500">{x.title}</p>
          <p className="text-base text-black">{x.description}</p>
        </Fragment>
      ))}
    </div>
  </>
);

export const getStaticProps = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data: CoursesApiResponse[] = await response.json();

  return {
    props: {
      data,
    },
  };
};

export default Courses;

type CoursesApiResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
