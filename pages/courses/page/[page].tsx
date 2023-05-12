import CourseList from "@/components/Courses/List/CourseList";
import LinkPagination from "@/components/Pagination/LinkPagination";
import apolloClient from "@/graphql/apolloClient";
import { useFragment } from "@/graphql/generated";
import {
  GetProductsDocument,
  GetProductsSlugDocument,
  ProductListItemFragmentDoc,
} from "@/graphql/generated/graphql";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

const NUMBER_OF_PAGES = 4000 / 25;

const Courses = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const currentPage =
    typeof router.query.page === "string" ? Number(router.query.page) : 1;

  const products = useFragment(ProductListItemFragmentDoc, data);

  return (
    <>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">
        Courses selected for you
      </h1>
      <CourseList courses={products} />
      <LinkPagination
        current={currentPage}
        pagesCount={NUMBER_OF_PAGES}
        baseHref="/courses/page"
      />
    </>
  );
};

const PRODUCTS_PER_PAGE = 8;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>) => {
  const pageIndex = Number(params?.page);

  const { data, error } = await apolloClient.query({
    query: GetProductsDocument,
    variables: {
      first: PRODUCTS_PER_PAGE,
      skip: (pageIndex - 1) * PRODUCTS_PER_PAGE,
    },
  });

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: false,
    props: {
      data: data.products,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const { data } = await apolloClient.query({
    query: GetProductsSlugDocument,
  });

  const numberOfPages = Math.ceil(data.products.length / PRODUCTS_PER_PAGE);

  return {
    paths: Array.from(Array(numberOfPages).keys()).map((x) => ({
      params: {
        page: (x + 1).toString(),
      },
    })),
    fallback: false,
  };
};

export default Courses;
