import AddToCartButton from "@/components/Courses/Card/AddToCartButton";
import CourseImage from "@/components/Courses/CourseImage";
import Markdown from "@/components/Markdown";
import ChevronLeft from "@/components/icons/ChevronLeft";
import courseFetcher from "@/services/courses/courseFetcher";
import courseListFetcher from "@/services/courses/courseListFetcher";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { serialize } from "next-mdx-remote/serialize";
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
      <div className="flex gap-8 my-8">
        <CourseImage
          src={data.image}
          alt={data.title}
          className="p-2 shadow-xl basis-2/3"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4 text-neutral-900">
            {data.title}
          </h1>
          <p className="text-lg text-na900 my-4">{data.description}</p>
          <div className="flex items-center gap-8">
            <p className="text-lg text-neutral-700 italic shrink-0">{`${data.price} zł`}</p>
            <AddToCartButton item={data} />
          </div>
        </div>
      </div>
      <article className="prose lg:prose-xl">
        <Markdown {...data.longDescription} />
      </article>
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
      data: { ...data, longDescription: await serialize(data.longDescription) },
    },
  };
};

export default Course;
