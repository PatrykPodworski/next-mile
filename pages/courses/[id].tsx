import ChevronLeft from "@/components/icons/ChevronLeft";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
      <Link
        href={"/courses"}
        className="flex gap-2 text-base text-blue-300 hover:text-blue-500 transition-all duration-300 items-center"
      >
        <ChevronLeft className="w-4 h-4" /> Go back
      </Link>
      <div className="flex gap-4 my-8">
        <div className="relative aspect-video w-80 shadow-xl overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4 text-neutral-900">
            {data.title}
          </h1>
          <p className="text-lg text-na900 my-4">{data.description}</p>
          <p className="text-lg text-neutral-700 italic">{`${data.price} zł`}</p>
        </div>
      </div>
      <p className="text-lg text-neutral-700">{data.longDescription}</p>
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
  id: string;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
};

export default Course;
