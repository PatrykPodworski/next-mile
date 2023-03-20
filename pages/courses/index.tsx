import Course from "@/components/Courses/Course";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

const Courses = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Courses list</title>
    </Head>
    <h1 className="text-4xl font-bold my-8 text-neutral-900">
      Courses selected for you
    </h1>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7">
      {data.slice(0, 8).map((x) => (
        <Course key={x.id} {...x} />
      ))}
    </ul>
  </>
);

export const getStaticProps = async () => {
  const response = await fetch("https://naszsklep-api.vercel.app/api/products");
  const data: CoursesApiResponse[] = await response.json();

  return {
    revalidate: false,
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
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
};
