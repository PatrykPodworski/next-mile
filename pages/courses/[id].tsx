import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { CoursesApiResponse } from ".";

const Course = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Data not available.</div>;
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1 className="text-4xl font-bold my-8 text-neutral-900">{data.title}</h1>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const response = await fetch("https://naszsklep-api.vercel.app/api/products");
  const data: CoursesApiResponse[] = await response.json();

  return {
    paths: data.map((x) => ({
      params: {
        id: x.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string }>) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params?.id}`
  );
  const data: CourseDetailsResponse | undefined = await response.json();

  return {
    props: {
      data,
    },
  };
};

type CourseDetailsResponse = {
  title: string;
};

export default Course;
