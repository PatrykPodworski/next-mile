import ChevronLeft from "@/components/icons/ChevronLeft";
import courseFetcher from "@/services/courses/courseFetcher";
import courseListFetcher from "@/services/courses/courseListFetcher";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

const Course = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Data not available.</div>;
  }

  return (
    <>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://next-mile.vercel.app/courses/${data.id}`}
        openGraph={{
          url: `https://next-mile.vercel.app/courses/${data.id}`,
          title: data.title,
          images: [
            {
              url: data.image,
              alt: data.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Link
        href={"/courses/page/1"}
        className="flex gap-2 text-base text-blue-300 hover:text-blue-500 transition-all duration-300 items-center"
      >
        <ChevronLeft className="w-4 h-4" /> Go back
      </Link>
      <div className="flex gap-4 my-8">
        <div className="aspect-video bg-white p-2 shadow-xl">
          <Image
            src={data.image}
            alt={data.title}
            width={16}
            height={9}
            className="object-contain h-full w-auto mx-auto"
            sizes="100vw"
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
  const data = await courseListFetcher();

  return {
    paths: data.slice(0, 8).map((x) => ({
      params: {
        id: x.id,
      },
    })),
    fallback: "blocking",
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

  const data = await courseFetcher(params.id);

  return {
    props: {
      data,
    },
  };
};

export default Course;
