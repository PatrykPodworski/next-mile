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

const Courses = ({
  data,
  numberOfPages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        pagesCount={numberOfPages}
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

  const numberOfPages = await getNumberOfPages();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: false,
    props: {
      data: data.products,
      numberOfPages: numberOfPages,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const numberOfPages = await getNumberOfPages();

  return {
    paths: Array.from(Array(numberOfPages).keys()).map((x) => ({
      params: {
        page: (x + 1).toString(),
        numberOfPages,
      },
    })),
    fallback: false,
  };
};

const getNumberOfPages = async () => {
  const { data } = await apolloClient.query({
    query: GetProductsSlugDocument,
  });

  return Math.ceil(data.products.length / PRODUCTS_PER_PAGE);
};

export default Courses;
