import CourseList from "@/components/Courses/List/CourseList";
import LinkPagination from "@/components/Pagination/LinkPagination";
import courseListFetcher from "@/services/courses/courseListFetcher";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const NUMBER_OF_PAGES = 4000 / 25;

const Courses = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const currentPage =
    typeof router.query.page === "string" ? Number(router.query.page) : 1;

  return (
    <>
      <Head>
        <title>Courses list</title>
      </Head>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">
        Courses selected for you
      </h1>
      <CourseList courses={data} />
      <LinkPagination
        current={currentPage}
        pagesCount={NUMBER_OF_PAGES}
        baseHref="/courses/page"
      />
    </>
  );
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>) => {
  const pageIndex = Number(params?.page);
  const data = await courseListFetcher(pageIndex);

  return {
    revalidate: false,
    props: {
      data,
    },
  };
};

const NUMBER_OF_STATIC_PAGES = 10;

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  return {
    paths: Array.from(Array(NUMBER_OF_STATIC_PAGES).keys()).map((x) => ({
      params: {
        page: (x + 1).toString(),
      },
    })),
    fallback: "blocking",
  };
};

export default Courses;
